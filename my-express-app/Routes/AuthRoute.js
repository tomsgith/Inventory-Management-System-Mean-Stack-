const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const UserModel = require('../models/users')

router.post("/register", async (req, res) => {
    try {
        let userModel = new UserModel(req.body)
        userModel.hashPassword()
        UserModel.findOne({ email: userModel.email }, function (err, user) {
            if (user) {
                res.status(200).json({ hasError: true, message: "User already exits" });
                res.end()
            } else {
                userModel.save(function (err, _userModel) {
                    if (err) return console.error(err);
                    res.status(200).json({ token: userModel.generateToken(), hasError: false, message: "User registered successfully" });
                    res.end()
                });
            }
        });
    } catch (e) {
        res.status(500).json(e);
        res.end()
    }
});

router.post('/verifyemail', async function (req, res) {
    try {
        let userModel = new UserModel(req.body)
        await UserModel.findOne({ email: userModel.email }, function (err, user) {
            if (user) {
                res.status(200).json({ hasError: false, message: "Email exists" });
                res.end()
            } else {
                res.status(400).json({ hasError: false, message: "Email doesn't exists" });
                res.end()
            }
        });
    } catch (e) {
        res.status(500).json(e);
        res.end()
    }
});

router.post('/login', async function (req, res) {
    try {
        let userModel = new UserModel(req.body)
        await UserModel.findOne({ email: userModel.email }, function (err, user) {
            if (!user) {
                res.status(202).json({ hasError: true, message: "Account doesn't exist, sign up" });
                res.end()
            } else if (!bcrypt.compareSync(userModel.password, user.password)) {
                res.status(401).json({ auth: false, token: null, hasError: true, message: "Invalid credentials" });
                res.end()
            } else {
                var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
                res.status(200).json({ auth: true, token: token, hasError: false, message: "Welcome" });
                res.end()
            }
        })
    } catch (e) {
        res.status(500).json(e);
        res.end()
    }
});

router.post('/verifyToken', async function (req, res) {
    try {
        await jwt.verify(req.body.token, config.secret, function (err, decoded) {
            if (err)
                return resp.status(200).json(false)
            else
                return resp.status(200).json(true)
        });
    } catch (e) {
        res.status(500).json(e);
        res.end()
    }
});

module.exports = router