const router = require('express').Router()
const SupplierModel = require('../models/supplier');

router.get("/", async (req, res) => {
    try {
        SupplierModel.find({}, function (err, suppliers) {
            if (suppliers) {
                res.status(200).send({ suppliers: suppliers, hasError: false, message: "Success" });
                res.end()
            } else {
                res.status(200).send({ hasError: true, message: "No supplier found." });
                res.end()
            }
        });
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

router.get("/:name", async (req, res) => {
    try {
        SupplierModel.find({name: { $regex: req.params.name }}, function (err, suppliers) {
            if (suppliers) {
                res.status(200).send({ suppliers: suppliers, hasError: false, message: "Success" });
                res.end()
            } else {
                res.status(200).send({ hasError: true, message: "No supplier found." });
                res.end()
            }
        });
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

router.post("/", async (req, res) => {
    try {
        let supplierModel = new SupplierModel(req.body)
        supplierModel.save(function (err, _userModel) {
            if (err) return console.error(err);
            res.status(200).send({ hasError: false, message: "Supplier registered successfully" });
            res.end()
        });
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

module.exports = router