import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  loadProducts(pageSize: number = 9, pageNumber: number = 0, sortBy: any = 'productId', sortDir: any = 'desc') {
    return this.http.get(`${environment.baseUrl}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
  }

  loadProductsByCategory(categoryId:number,pageSize: number = 9, pageNumber: number = 0, ) {
    return this.http.get(`${environment.baseUrl}/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  
  loadProductById(productId:number){
    return this.http.get(`${environment.baseUrl}/products/${productId}`)
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.baseUrl}/categories/${product.categoryId}/products`, product);
  }

  loadProductsWithoutPagination(){
    return this.http.get(`${environment.baseUrl}/products/getAll`)
  }
}
