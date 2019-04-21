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

  getcatagories(): Observable<category[]> {
    return this.http.get<category[]>(this.baseUrl + '/products/category/category')
  }
}

export interface category {
  name: string,
  description: string
}




