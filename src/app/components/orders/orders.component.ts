import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal) {
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

}
