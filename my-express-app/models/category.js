const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,  
    description: String, 
   
});

module.exports = mongoose.model('category',CategorySchema);

