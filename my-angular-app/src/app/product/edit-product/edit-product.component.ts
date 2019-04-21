import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {FormControl,FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(public productService: ProductService) {

  }
  editProducts() {
    this.productService.editProduct(this.editProducts.arguments).subscribe((data) => {console.log('product is editted') },
     (err) => {console.log('can not edit Product')})
  }

  saveProduct():void{
    this.productService.addProduct(this.editProducts.arguments).
    subscribe((data)=>{console.log('New product added')},(err)=>{console.log('Cannot add this product')})

  }
  ngOnInit() {
  }

}
