import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  baseUrl=''
  orderProceed=false
  order={
    address:'',
    cartId:''
  }
  redirect=false
  notCalculate=true

  totalValue=0

  countTotalValue(){

    if(this.totalValue==0){
      let items=this.cart.items
      for (let i of items) {
           this.totalValue+=i.totalProductPrice
       }
      
    }
    else{
      this.totalValue=0
      let items=this.cart.items
      for (let i of items) {
           this.totalValue+=i.totalProductPrice
       }

       

    }

   
    console.log(this.totalValue)
  }


  constructor(private cartService:CartService,
    private toast:ToastrService,
    private orderService:OrderServiceService) {
      this.baseUrl=environment.baseUrl
     }

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart() {
   this.cartService.getCart().subscribe({
    next:data=>{
      console.log(data)
      this.cart=data
      this.cartService.cartChanged(this.cart)
    },
    error:error=>{
      console.log(error)
    }
   })
  }

  removeItem(item:any){
    this.cartService.removeItemFromCart(item.product.productId).subscribe({
      next:data=>{
        console.log(data);
        this.cart=data
        this.toast.success("Item is removed from cart")
        this.toast.warning("Please Calculate Total Price Using Calculator")
        this.cartService.cartChanged(this.cart)
      },
      error:error=>{
        console.log(error);

      }
    })
  }

  quantityChange(productId:any,quantity:any){
    this.cartService.addItemToCart(productId,quantity).subscribe({
      next:data=>{
        console.log(data);
        this.cart=data
        this.toast.success("Quantity Changes")
        this.toast.warning("Please Calculate Total Price Using Calculator")
        this.cartService.cartChanged(this.cart)
      },
      error:error=>{
        console.log(error);

      }
    })
  }

  createOrderAndProceedForPayment(){
    this.order.cartId=this.cart.cartId
    this.orderService.createOrder(this.order).subscribe({
      next:data=>{
        console.log(data)
        this.toast.success("Order Created")
        this.loadCart()
        this.toast.success("Redirecting to Payment Page")
        this.redirect=true
      },
      error:error=>{
        console.log(error)
        this.toast.error("Error in Creating Order")
      }

    })
  }

       

}
