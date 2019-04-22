const router = require('express').Router()
const ProductService = require('../Service/salesproduct');
const productService = new ProductService();
const ProductSale = require('../Service/sales');
const productSale = new ProductSale();
const CategoryService = require('../Service/category');
const categoryService = new CategoryService();
const SaleLoadService = require('../Service/saleLoadSer');
const saleLoadService = new SaleLoadService();

//usrls for geting and updating products
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
router.get('/catagory/:type', function (req, res, next) {
  const queryObj = { "type": req.params.type };
  productService.getAll(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});
router.get('/name/:name', function (req, res, next) {
  const queryObj = { "name": req.params.name };
  productService.getAll(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});


//usrls for sale
router.get('/sale', function (req, res, next) {
  const queryObj = {};
  productSale.getAll(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});
router.post('/sale', async function (req, res, next) {
  // console.log(">>>", req.body)
  for (let x = 0; x < req.body.length; x++) {
    let quantity = 0;

    await productService.getOne({ "_id": req.body[x]._id })
      .subscribe((product) => {
        quantity = product.quantity
      }, (err) => console.log(err))

    const queryObj = { "_id": req.body[x]._id }
    await productService.update(queryObj, {
      $set: { quantity: quantity - req.body[x].quantity }
    }).subscribe(() => console.log("succes"), () => console.log("cant update"))

    await productSale.add(req.body[x])
      .then(() => console.log('success saved sale for product'))
      .catch((err) => next(err));
  }
  res.status(200).json({
    success: true
  })
});
//getting all categories
router.get('/category/category', (req, res, next) => {
  const query = {};
  categoryService.getAll(query).subscribe(
    (data) => res.status(200).json(data),
    (err) => next(err), null);

});


//loading sale load//////post
router.post('/saleLoad', function (req, res, next) {
  saleLoadService.add(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});


//get all
router.get('/saleLoad', function (req, res, next) {
  const queryObj = {};
  saleLoadService.getAll(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});
//get by Id
router.get('/saleLoad/:id', function (req, res, next) {
  const queryObj = { "_id": req.params.id };
  saleLoadService.getOne(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});
//get a product prom saleLoad
router.get('/saleLoad/:saleLoadid/product/:productId', function (req, res, next) {
  const queryObj = { "_id": req.params.saleLoadid };
  console.log('route')
  saleLoadService.getAll({}).subscribe(
    (cart) => {

      res.status(200).json(cart)
    },

    (err) => next(err),
    null
  );

});


module.exports = router