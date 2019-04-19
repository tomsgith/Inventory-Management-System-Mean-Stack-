//dependency
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient

//init
const app = express()

//setup
app.use(express.json());
app.use(cors())
app.use(helmet())

let collection;

const connectToMongo = async function () {
    const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
    await client.connect();
    const db = client.db('HW15');
    collection = db.collection('user');
}
connectToMongo();

//middleware
app.post('*', function (req, resp, next) {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('Invalid data from user.');
        }
    } catch (e) {
        return next(400)
    }
    return next()
})

//routing
app.post("/register", async (req, res) => {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        await collection.find({ email: req.body.email }).toArray((err, docArr) => {
            if (docArr.length > 0) {
                res.status(409).send({ hasError: true, message: "User already exits" });
                res.end()
            } else {
                collection.insertOne({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword
                }, function (err, doc) {
                    var token = jwt.sign({ id: doc._id }, config.secret, { expiresIn: 86400 });
                    res.status(200).send({ auth: true, token: token, hasError: false, message: "User registered successfully" });
                    res.end()
                });
            }
        })
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

app.post('/verifyemail', function (req, res) {
    try {
        collection.find({ email: req.body.email }).toArray((err, user) => {
            if (err) {
                res.status(500).send({ hasError: true, message: "Error while validating email" });
                res.end()
            }
            if (user.length == 0) {
                res.status(400).send({ hasError: false, message: "Email doesn't exists" });
                res.end()
            } else {
                res.status(200).send({ hasError: false, message: "Email exists" });
                res.end()
            }
        })
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

app.post('/login', function (req, res) {
    try {
        collection.find({ email: req.body.email }).toArray((err, user) => {
            if (err) {
                res.status(500).send({ hasError: true, message: "Error while login" });
                res.end()
                return
            }
            if (user.length == 0) {
                res.status(202).send({ hasError: true, message: "No user found" });
                res.end()
                return
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
            if (!passwordIsValid) {
                res.status(401).send({ auth: false, token: null, hasError: true, message: "Invalid credentials" });
                res.end()
                return
            }
            var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token: token, hasError: false, message: "Welcome" });
            res.end()
        })
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

//error handling 
app.use(function (err, req, resp, next) {
    if (err === 400) {
        resp.status(400).send('Bad Request.')
        resp.end()
    }
    else {
        resp.status(500).send('Internal Server Error.')
        resp.end()
    }
})

//boot
app.listen(3000, () => console.log('Listening at 3000'))