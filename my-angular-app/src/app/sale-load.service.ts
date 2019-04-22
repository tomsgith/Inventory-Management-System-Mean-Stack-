import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SaleLoadService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  getProductOnSaleLoad(cartId,productId):Observable<Product>{
    return this.http.get<Product>(this.baseUrl + '/sales/saleLoad/'+cartId+'/product/'+productId);
  }
  
  private create():Observable<saleLoad>{
    return this.http.post<saleLoad>(this.baseUrl + '/sales/saleLoad',{"saleCreated":new Date().getTime()});
  }

  private getsaveLoad(cardId:string):Observable<saleLoad>{
    return this.http.get<saleLoad>(this.baseUrl + '/sales/saleLoad/'+cardId);
  }
 private async  getOrcreateLoadId(){
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;
     
      let result= await this.create().toPromise();      
      localStorage.setItem('cardId',result._id);  
       return result._id;     
     
      
  }
 async addTosaleLoad(product:Product){

    let cartId=await this.getOrcreateLoadId();
    

  }
}
export interface Product {
  name: String,
  brand: String, 
  description: String, 
  quantity:Number,
  type:String,
  price:Number,
  image:String,
  username:String,
  created_at: Date,
  updated_at: Date
}
export interface saleLoad{
  _id:string,
  saleLoadname:String,
    product:Product[],
    saleCreated:Date,
    sale_updated: Date
}