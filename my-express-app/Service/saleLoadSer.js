const {from} = require('rxjs');
let saleLoad = require('../models/saleLoad');
class saleLoadService {
    constructor() {

    }

    add(saleLoadObj) {        
        let newsaleLoad = new saleLoad(saleLoadObj);
        console.log(newsaleLoad)
        return newsaleLoad.save();

    }

    getOne(queryObj) {
        return from(saleLoad.findOne(queryObj));
    }

    getAll(queryObj) {
        return from(saleLoad.find(queryObj));
    }

    update(queryObj,updateObj) {
        return from(saleLoad.updateOne(queryObj,updateObj));
    }
    

    delete(queryObj) {}
}

module.exports = saleLoadService;