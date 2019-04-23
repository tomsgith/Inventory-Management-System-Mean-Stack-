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

  deleteSupplier(supplier: SupplierModel): Observable<ErrorModel> {
    return this.http.delete<ErrorModel>(this.baseUrl + '/supplier/' + supplier._id)
  }

  updateSupplier(supplier: SupplierModel): Observable<ErrorModel> {
    return this.http.patch<ErrorModel>(this.baseUrl + '/supplier/', supplier)
  }

  saveSupplier(supplier: SupplierModel): Observable<ASupplierResponse> {
    return this.http.post<ASupplierResponse>(this.baseUrl + '/supplier/', supplier)
  }

  getSupplierByName(name: String): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.baseUrl + '/supplier/' + name)
  }

  getSupplier(): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.baseUrl + '/supplier')
  }
}

export interface SupplierModel {
  name: String,
  address: String,
  phone: String,
  email: String,
  type: String,
  _id: String
}

export interface SupplierResponse {
  suppliers: [SupplierModel],
  hasError: false,
  message: String
}

export interface ASupplierResponse {
  suppliers: SupplierModel,
  hasError: false,
  message: string
}
