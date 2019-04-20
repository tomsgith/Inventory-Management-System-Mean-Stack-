import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products;
  constructor(public productService:ProductService) { 
    this.getProduct();
  }

  getProduct(){
    console.log(this.productService.getProductsService());
    this.productService.getProductsService().subscribe((data)=>{
      console.log(data)
      this.products= data;
    });

  }

  ngOnInit() {
    this.products=[{name:"elsa", description:"bls nls nls",brand:"bls nls nls",quantity:"bls nls nls"}];
  }

}
