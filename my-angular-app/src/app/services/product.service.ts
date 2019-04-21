import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/api"
  constructor(public http: HttpClient) { }


  getProductsService(): Observable<any> {
    return this.http.get(this.url + '/product');
  }

  editProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(this.url + '/edit/', product);
  }

  addProduct(product): Observable<any> {
    return this.http.post(this.url, product)
  }


}

export interface ProductModel {
  name: String,
  brand: String,
  description: String,
  quantity: Number,
  type: String,
  price: Number,
  image: String,
  username: String,
  created_at: Date,
  updated_at: Date
}
