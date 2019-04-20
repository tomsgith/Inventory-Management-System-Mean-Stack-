const router = require('express').Router()
const Product = require('../models/product');
const productService = require('../Service/productService');

router.post('/', (req, res) => {
   productService.a
    
});

// router.get('/', (req, res, next) => {
    
//     Product.find({}, { _id: 0, products: 1, address: 0, sales: 0, warehouse_name: 0, users: 0 })
//         .toArray((err, data) => {
//             if (err) return next(new Error(err));
//             res.status(200).json(data);
//         });
// });

// router.get('/:id', (req, res, next) => {
//     const collection = req.db.collection;

//     const id = req.params.id;
//     collection.find({ _id: id }, { _id: 0, products: 1, address: 0, sales: 0, warehouse_name: 0, users: 0 })
//         .toArray((err, data) => {
//             if (err) return next(new Error(err));
//             res.status(200).json(data);
//         })
// });






module.exports = router;