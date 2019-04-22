const mongoose = require('mongoose');

const SaleLoadSchema = new mongoose.Schema({
    saleLoadname:String,
    product:[{
        name: String,
        brand: String, 
        description: String, 
        quantity:Number,
        type:String,
        price:Number,
        image:String,
        username:String,
        created_at: Date,
        updated_at: Date
    }],
    saleCreated:Date,
    sale_updated: Date
});
SaleLoadSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.sale_updated = currentDate;
    if (!this.created_at) this.saleCreated = currentDate;
    next();
});

module.exports = mongoose.model('saleLoad',SaleLoadSchema);

