import { Component, OnInit,ViewChild  } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'productName', 'productPrice', 'productDesc','action'];
  dataSource:any;
  products:any

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.product.loadProductsWithoutPagination().subscribe({
      next:data=>{
        console.log(data)
        this.products=data
        //this.dataSource=this.products.content
        this.dataSource = new MatTableDataSource(this.products.content)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       
        console.log(this.products)
      },
      error:error =>{
        console.log(error)
      }
      
    })
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

}
