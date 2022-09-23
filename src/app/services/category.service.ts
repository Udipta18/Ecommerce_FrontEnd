import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  loadCategories(){
    return this.http.get(`${environment.baseUrl}/categories/`)
  }

  createCategory(category:Category){
    return this.http.post(`${environment.baseUrl}/categories/`,category)
  }


}
