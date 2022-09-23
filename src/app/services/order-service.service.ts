import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private httpclient:HttpClient) { }

  createOrder(order:any){
    return this.httpclient.post(`${environment.baseUrl}/orders/`,order)
  }

  getOrders() {
    return this.httpclient.get(`${environment.baseUrl}/orders/`)

  }

  //get all orders

  getAllOrders() {
    return this.httpclient.get(`${environment.baseUrl}/orders/all`)

  }
}





