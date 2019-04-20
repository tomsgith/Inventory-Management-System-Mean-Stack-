const router = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.post("/register", async (req, res) => {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        await req.collection.find({ email: req.body.email }).toArray((err, docArr) => {
            if (docArr.length > 0) {
                res.status(409).send({ hasError: true, message: "User already exits" });
                res.end()
            } else {
                console.log(req.collection)
                req.collection.insertOne({
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

router.post('/verifyemail', async function (req, res) {
    try {
        await req.collection.find({ email: req.body.email }).toArray((err, user) => {
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

router.post('/login', async function (req, res) {
    try {
        await req.collection.find({ email: req.body.email }).toArray((err, user) => {
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

module.exports = router