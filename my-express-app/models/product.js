const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const productSchema = new mongoose.Schema({
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
});
productSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('products',productSchema);

