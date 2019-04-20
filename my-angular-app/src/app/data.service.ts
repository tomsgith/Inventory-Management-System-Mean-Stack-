import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = "http://localhost:3000"

  constructor(private http: HttpClient) {

  }

  verifyemail(emailModel: Object) {
    return this.http.post(this.baseUrl + '/api/auth/verifyemail', emailModel)
  }

  register(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/api/auth/register', userModel)
      .pipe(
        tap((user: UserResponse) => console.log(user))
      );
  }

  login(userModel: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl + '/api/auth/login', userModel)
      .pipe(
        tap((user: UserResponse) => console.log(user))
      );
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