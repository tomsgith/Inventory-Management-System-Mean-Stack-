const router = require('express').Router()
const ProductService = require('../Service/salesproduct');
const productService = new ProductService();

router.post('/', function (req, res, next) {
    productService.add(req.body)
      .then(() => res.status(200).json({
        success: true
      }))
      .catch((err) => next(err));
  });

  router.get('/', function (req, res, next) {
    const queryObj = {};
    productService.getAll(queryObj).subscribe(
        (users) => res.status(200).json(users),
        (err) => next(err),
        null
      );
    
    });
    router.get('/:type', function (req, res, next) {
        const queryObj = {"type":req.params.type};
        productService.getAll(queryObj).subscribe(
            (users) => res.status(200).json(users),
            (err) => next(err),
            null
          );
        
        });
module.exports = router