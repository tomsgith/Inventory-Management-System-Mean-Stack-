const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    type: String
});

module.exports = mongoose.model('Supplier', SupplierSchema);