const router = require('express').Router()
const ProductService = require('../Service/productService');
const productService = new ProductService();
const CategoryService = require('../Service/category');
const categoryService = new CategoryService();

router.post('/', function (req, res, next) {
    productService.add(req.body)
        .then(() => res.status(200).json({
            success: true
        }))
        .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
    const query = {};
    productService.getAll(query).subscribe(
        (data) => res.status(200).json(data),
        (err) => next(err), null);

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    productService.getOne({_id: id}).subscribe(
        (data) => res.status(200).json(data),
        (err) => next(err),
        null);

});

router.get('/category/category', (req, res, next) => {
    const query = {};
    categoryService.getAll(query).subscribe(
        (data) => res.status(200).json(data),
        (err) => next(err), null);

});

router.post('/category', function (req, res, next) {

    categoryService.add(req.body)
        .then(() => res.status(200).json({
            success: true
        }))
        .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
    const id = req.param.id;
    product = req.body;
    productService.update(id, product)
        .subscribe(
            (data) => res.status(200).json(data),
            (err) => next(err), null);

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    productService.delete(id).subscribe(
        (data) => { res.status(200).json({ message: 'product deleted successfully' }) },
        (err) => next(err), null);
});

module.exports = router;