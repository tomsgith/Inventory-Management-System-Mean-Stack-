import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/salesform/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proform',
  templateUrl: './proform.component.html',
  styleUrls: ['./proform.component.css']
})
export class ProformComponent {
  categories$
  newProduct:FormGroup
 
  constructor(category:CategoryService) {
    this.categories$ =category.getall();
    console.log(">>>>>>")
   }
  
  //   saveProduct():void{
  //   this.productService.addProduct(this.newProduct.value).
  //   subscribe((data)=>{console.log('New product added')},(err)=>{console.log('Cannot add this product')})

  // }
  

}
