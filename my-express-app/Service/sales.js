const {from} = require('rxjs');
let Sale = require('../models/sale');
class SaleService {
    constructor() {

    }

    add(SaleObj) {
        let newSale = new Sale(SaleObj);
        return newSale.save();

    }

    getOne(queryObj) {
        return from(Sale.findOne(queryObj));
    }

    getAll(queryObj) {
        return from(Sale.find(queryObj));
    }

    update(queryObj, updateObj) {
        return from(Sale.updateOne(queryObj, updateObj));
    }

    delete(queryObj) {}
}

module.exports = SaleService;