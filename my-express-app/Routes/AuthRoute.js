const router = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const UserModel = require('../models/users');

router.post("/register", async (req, res) => {
    try {
        let userModel = new UserModel(req.body)
        userModel.hashPassword()
        UserModel.findOne({ email: userModel.email }, function (err, user) {
            if (user) {
                res.status(409).send({ hasError: true, message: "User already exits" });
                res.end()
            } else {
                userModel.save(function (err, _userModel) {
                    if (err)
                        return console.error(err);
                    res.status(200).send({ token: userModel.generateToken(), hasError: false, message: "User registered successfully" });
                    res.end()
                });
            }
        });
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

router.post('/verifyemail', async function (req, res) {
    try {
        let userModel = new UserModel(req.body)
        UserModel.findOne({ email: userModel.email }, function (err, user) {
            console
            if (user) {
                res.status(200).send({ hasError: false, message: "Email exists" });
                res.end()
            } else {
                res.status(400).send({ hasError: false, message: "Email doesn't exists" });
                res.end()
            }
        });
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

            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    debug("User authenticated, generating token");
                    utils.create(user, req, res, next);
                } else {
                    return next(new UnauthorizedAccessError("401", {
                        message: 'Invalid username or password'
                    }));
                }
            });

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