const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    name: String,
    brand: String, 
    description: String, 
    quantity:Number,
    type:String,
    price:Number,
    username:String,
    created_at: Date,
    updated_at: Date,
    productid: String,
    saleDate:Date
});
saleSchema.pre('save', function (next) {
    var currentDate = new Date();  
    if (!this.saleDate) this.saleDate = currentDate;
    next();
});

module.exports = mongoose.model('sales',saleSchema);

