import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }


  getProductsService(): Observable<any>{
    return this.http.get("http://localhost:3000/api/products");
  }
}
