import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output()
  public cartEmitter=new EventEmitter<any>()

  constructor(private httpClient:HttpClient) { }


  cartChanged(cart:any){
    this.cartEmitter.emit(cart)
  }

  getCart(){
    return this.httpClient.get(`${environment.baseUrl}/carts/`)
  }

  addItemToCart(productId:number,quantity:number){

    return this.httpClient.post(`${environment.baseUrl}/carts/`,{
      productId:productId,
      quantity:quantity
    })
  }


  removeItemFromCart(productId:number){
       return this.httpClient.put(`${environment.baseUrl}/carts/${productId}`,{})
  }
}
