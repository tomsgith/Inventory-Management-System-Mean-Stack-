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

  getProductById(id: String): Observable<any> {
    return this.http.get(this.url + '/product/'+id)
  }

 
  editProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.url + '/product/edit', product);
  }

  addProduct(product): Observable<any> {
    return this.http.post<ProductModel>(this.url +'/product', product)
  }

  getall(): Observable<category[]> {
    return this.http.get<category[]>(this.url + '/product/category/category')
  }

  delete(id:String):Observable<any>{
    return this.http.delete(this.url +'/product/'+ id);
  }

}

export interface ProductModel {
  name: String,
  brand: String,
  description: String,
  quantity: number,
  category: String,
  price: Number,
  image: String,
  username: String,
  created_at: Date,
  updated_at: Date,
  _id: string
}
export interface category {
  name: string,
  description: string
}