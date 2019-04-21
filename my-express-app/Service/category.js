const {from} = require('rxjs');
let Category = require('../models/category');
class CategoryService {
    constructor() {

    }

    add(CategoryObj) {        
        let newCategory = new Category(CategoryObj);
        return newCategory.save();

    }

    getOne(queryObj) {
        return from(Category.findOne(queryObj));
    }

    getAll(queryObj) {
        return from(Category.find(queryObj));
    }

    update(queryObj,updateObj) {
        return from(Category.updateOne(queryObj,updateObj));
    }
    

    delete(queryObj) {}
}

module.exports = CategoryService;