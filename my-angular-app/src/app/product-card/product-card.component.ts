import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../salesform/data.service.sale';
import { SaleLoadService } from '../sale-load.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product:Product;
@Input('show-actions') showActions=true;
  constructor(private saleLoad:SaleLoadService) { }

  addToCart(product:Product){
    
   let cardId=localStorage.getItem('cardId');
   console.log(cardId)
   if(!cardId){
    console.log(">>>>addtocart working")
    this.saleLoad.create().subscribe((param)=>{
    localStorage.setItem('cardId',param._id);

      //Add to cart
    });
   }else {
     //add product to shoping cart
     
   }
  }

}
