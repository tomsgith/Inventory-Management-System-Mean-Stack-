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

router.post("/", async (req, res) => {
    try {
        let supplierModel = new SupplierModel(req.body)
        SupplierModel.findOne({ name: supplierModel.name }, function (err, supplier) {
            if (supplier) {
                res.status(200).send({ hasError: true, message: "Supplier already exits" });
                res.end()
            } else {
                supplierModel.save(function (err, _supplierModel) {
                    if (err) return console.error(err);
                    res.status(200).send({ supplier: _supplierModel, hasError: false, message: "Supplier registered successfully" });
                    res.end()
                });
            }
        });
    } catch (e) {
        res.status(500).send(e);
        res.end()
    }
});

router.patch("/", async (req, res) => {
    try {
        let supplierModel = new SupplierModel(req.body)
        SupplierModel.updateOne({ _id: supplierModel._id }, supplierModel, function (err, supplier) {
            if (supplier) {
                res.status(200).send({ hasError: false, message: "Supplier updated successfully" });
                res.end()
            } else {
                res.status(200).send({ hasError: true, message: "Supplier not found or doesn't exist" });
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
        SupplierModel.find({ name: { $regex: new RegExp(req.params.name, "i") } }, function (err, suppliers) {
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

router.delete("/:id", async (req, res) => {
    try {
        SupplierModel.deleteOne({ _id: req.params.id }, function (err, suppliers) {
            if (suppliers) {
                res.status(200).send({ hasError: false, message: "Supplier deleted succesfully" });
                res.end()
            } else {
                res.status(200).send({ hasError: true, message: "No supplier found" });
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