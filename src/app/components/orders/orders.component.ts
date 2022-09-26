import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment.service';
import { WindowRef } from 'src/app/services/WindoeRef';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  baseUrl:any

  constructor(
    private orderService:OrderServiceService,
    private toast:ToastrService,
    private modalService: NgbModal,
    private paymentService:PaymentService,
    private windowRef: WindowRef,
    private router: Router,
    private ngZone:NgZone) {
    this.baseUrl=environment.baseUrl
   }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
   this.orderService.getOrders().subscribe({
    next:data=>{
      console.log(data)
      this.toast.success("Order Loaded")
      this.orders = data
    },
    error:error=>{
      console.log(error)
      this.toast.error("Error during order")
    }
    
   })
  }

  getFormattedDate(time: number) {
    return new Date(time).toDateString()
  }

  selectedOrder: any
  openModal(content: any, orderId: number) {

    this.selectedOrder = this.orders.find((order: any) => order.orderId == orderId)
    console.log(this.selectedOrder);

    this.modalService.open(content, { size: 'lg' })


  }

  // reateOrderAndProceedForPayment(){
  //   this.order.cartId=this.cart.cartId
  //   this.orderService.createOrder(this.order).subscribe({
  //     next:(data:any)=>{
  //       console.log(data)
  //       this.toast.success("Order Created")
  //       this.loadCart()
  //       this.toast.success("Redirecting to Payment Page")
  //       this.redirect=true
  //       this.startPaymentComponent(data.orderAmount, data);
  //     },
  //     error:error=>{
  //       console.log(error)
  //       this.toast.error("Error in Creating Order")
  //     }

  //   })
  // }

   startPaymentComponent(number: number, userOrder: any) {
    this.paymentService.startPayment(number).subscribe({
      next: (data: any) => {
        console.log(data)
        // this.toast.success("Order Created For payment")
        // open the form

        if (data.message === 'CREATED') {
          let options: any = {
            "key": "rzp_test_NzUeUVYjEGLwA3", // Enter the Key ID generated from the Dashboard
            "amount": data.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "LCWD Payment",
            "description": "This is ecommerce payment",
            "image": "https://learncodewithdurgesh.com/_next/image?url=%2Fimages%2Fdurgesh_sir.webp&w=1920&q=75",
            "order_id": data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://learncodewithdurgesh.com",
            "prefill": {
              "name": "",
              "email": "",
              "contact": ""
            },
            "notes": {
              "address": ""
            },
            "theme": {
              "color": "black"
            }
          };


          options.handler = (response: any) => {

            response['user_order_id'] = userOrder.orderId;

            console.log(response)


            this.paymentService.successPayment(response).subscribe({
              next: (res: any) => {
                console.log(res)
                //this.toast.success("Payment done : We are forwarding your order.")
                if (res.captured) {
                  this.ngZone.run(()=>   this.toast.success("Payment done : We are forwarding your order."));
                  this.ngZone.run(()=> this.router.navigate(['/store/all']));
                 
                  
                }
                //this.toast.success("Payment done : We are forwarding your order.")


              }
            })


          }


          const rzp = new this.windowRef.nativeWindow.Razorpay(options);
          rzp.open()

        }


      },
      error: error => {
        console.log(error)
        this.toast.error("Error in creating order for payment")
      }
    })
  }


}
