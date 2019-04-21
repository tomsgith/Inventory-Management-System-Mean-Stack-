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

  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.baseUrl + '/sales')
  }
}



export interface product {
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

