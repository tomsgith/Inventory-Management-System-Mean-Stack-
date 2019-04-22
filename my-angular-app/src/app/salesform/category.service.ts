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

  getall(): Observable<category[]> {
    return this.http.get<category[]>(this.baseUrl + '/sales/category/category')
  }
}

export interface category {
  name: string,
  description: string
}




