import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorModel } from './user.data.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierDataService {
  baseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) {

  }

  updateSupplier(supplier: SupplierModel): Observable<ErrorModel> {
    return this.http.patch<ErrorModel>(this.baseUrl + '/supplier/', supplier)
  }

  getSupplierByName(name: String): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.baseUrl + '/supplier/' + name)
  }
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
