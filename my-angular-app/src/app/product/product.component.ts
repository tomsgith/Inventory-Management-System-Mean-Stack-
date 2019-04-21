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
 
    this.productService.getProductsService().subscribe((data)=>{
     
      this.products= data;
    });

  }

  ngOnInit() {
  
  }

}
