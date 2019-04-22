const mongoose = require('mongoose');

const SaleLoadSchema = new mongoose.Schema({
    saleLoadname: String,
    saleCreated: Date,
    sale_updated: Date,
    products: {
        type: Array, "default": [{
            _id: String,
            name: String,
            brand: String,
            description: String,
            quantity: Number,
            type: String,
            price: Number,
            image: String,
            username: String,
            created_at: Date,
            updated_at: Date
        }]
    }
});
SaleLoadSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.sale_updated = currentDate;
    if (!this.created_at) this.saleCreated = currentDate;
    next();
});

module.exports = mongoose.model('saleLoad', SaleLoadSchema);

