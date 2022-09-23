import { Component, OnInit,ViewChild } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'orderAmount','paymentStatus', 'orderStatus', 'orderCreated','ITEMS','ACTION'];
  dataSource:any;
  orders:any
  baseUrl:string


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private orderService:OrderServiceService, 
    private toast: ToastrService,
    private modalService: NgbModal
  ) { 
    this.baseUrl = environment.baseUrl
  }

  ngOnInit(): void {
    this.getOrders()
  }
  getOrders() {
    this.orderService.getAllOrders().subscribe({
      next:data =>{
         this.orders=data
         console.log(this.orders)
         this.dataSource = new MatTableDataSource(this.orders)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.orders)
      },
      error:error=>{
         console.log(error);
         
      }

    })
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getDate(number: number) {
    return new Date(number).toDateString()
  }

  selectedOrder: any

  openModal(content: any, orderId: number) {

    this.selectedOrder = this.orders.find((order: any) => order.orderId == orderId)
    console.log(this.selectedOrder);

    this.modalService.open(content, {size: 'lg'})


  }


}
