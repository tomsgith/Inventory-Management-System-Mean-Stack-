import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  verifyemail(emailModel: Object) {
    return this.http.post(this.baseUrl + '/auth/verifyemail', emailModel)
  }

  register(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/auth/register', userModel)
      .pipe(
        tap((user: UserResponse) => console.log(user))
      );
  }

  login(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/auth/login', userModel)
      .pipe(
        tap((user: UserResponse) => console.log(user))
      );
  }

  getSupplierByName(name: String): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.baseUrl + '/products/' + name)
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


