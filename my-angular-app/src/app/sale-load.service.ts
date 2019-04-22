import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SaleLoadService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  getall(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/sales')
  }
  create():Observable<saleLoad>{
    return this.http.post<saleLoad>(this.baseUrl + '/sales/saleLoad',{"saleCreated":new Date().getTime()});
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