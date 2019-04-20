const router = require('express').Router()

const ProductService = require('../Service/productService');
const productService = new ProductService();


router.post('/', function (req, res, next) {

    productService.add(req.body)
      .then(() => res.status(200).json({
        success: true
      }))
      .catch((err) => next(err));
  });

router.get('/', (req, res, next) => {
    const query ={};
        productService.getAll(query).subscribe(
        (data)=>res.status(200).json(data),
        (err)=>next(err),null);
                    
});

router.get('/:id', (req, res,next) => {
    const id = req.param.id;
    productService.getOne(id).subscribe(
    (data)=> res.status(200).json(data),
    (err)=> next(err),
    null);
       
});

router.put('/:id',(req,res,next)=>{
    const id= req.param.id;
    product = req.body;
    productService.update(id,product)
    .subscribe(       
        (data)=> res.status(200).json(data),
        (err)=> next(err),null);
   
});
router.delete('/:id',(req,res,next)=>{
    const id = req.param.id;
    productService.delete(id).subscribe(
        (data)=> {console.log('product deleted successfully')},
        (err) => next(err), null);
});












module.exports = router;