import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleDataService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  saveSale(products: Product[]): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl + '/sales/sale', products)
  }

  getall(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/sales')
  }

}



export interface Product {
  name: String,
  brand: String,
  description: String,
  quantity: number,
  category: String,
  price: number,
  image: String,
  username: String,
  supplier: String,
  created_at: Date,
  updated_at: Date,
  _id: String,
  totalPrice: Number;
  productid: String
}

