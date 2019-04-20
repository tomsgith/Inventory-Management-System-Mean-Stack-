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


  getSupplierByName(name: String): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.baseUrl + '/sales/' + name)
  }
}

export interface ErrorModel {
  hasError: string,
  message: string
}

export interface UserModel {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface UserResponse {
  auth: boolean,
  token: string,
  hasError: boolean,
  message: string
}

export interface SupplierModel {
  name: String,
  address: String,
  phone: String,
  email: String,
  type: String
}

export interface SupplierResponse {
  suppliers: [SupplierModel],
  hasError: false,
  message: "Success"
}
