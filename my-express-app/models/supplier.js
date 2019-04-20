const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true });

const SupplierSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    type: String
});

module.exports = mongoose.model('Supplier', SupplierSchema);