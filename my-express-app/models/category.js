const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const CategorySchema = new mongoose.Schema({
    name: String,  
    description: String, 
   
});


module.exports = mongoose.model('category',CategorySchema);

