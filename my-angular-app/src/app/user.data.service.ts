import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  verifyemail(emailModel: Object) {
    return this.http.post(this.baseUrl + '/auth/verifyemail', emailModel)
  }

  register(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/auth/register', userModel)
  }

  verifyToken(token: String): Observable<ErrorModel> {
    return this.http.post<ErrorModel>(this.baseUrl + '/auth/verifyToken', { "token": token })
  }

  login(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/auth/login', userModel)
  }
}

export interface ErrorModel {
  hasError: boolean,
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
