import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/api"
  constructor(public http: HttpClient) { }


  getProductsService(): Observable<any>{
    return this.http.get(this.url +'/products');
  }

  editProduct(id):Observable<any>{
    return this.http.patch(this.url +'/edit/',id);
  }

  addProduct(product):Observable<any>{
    return this.http.post(this.url,product)
  }

}
