import { Component, OnInit,ViewChild  } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName','action'];
  dataSource:any;
  categories:any

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private category:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories() {
    this.category.loadCategories().subscribe({
      next:data=>{
        console.log(data)
        this.categories=data
        //this.dataSource=this.products.content
        this.dataSource = new MatTableDataSource(this.categories)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       
        console.log(this.categories)
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
