const router = require('express').Router()

const ProductService = require('../Service/productService');
const productService=new ProductService();


router.post('/', function (req, res, next) {

    productService.add(req.body)
      .then(() => res.status(200).json({
        success: true
      }))
      .catch((err) => next(err));
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