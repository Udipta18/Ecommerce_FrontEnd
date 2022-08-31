import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  categories: any
  products: any;


  constructor(
    private category: CategoryService,
    private product: ProductService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((values: any) => {
      console.log(values.categoryId);

      this.getProducts(values.categoryId)

    })


    this.getCategories()
  }


  getCategories(){
    this.category.loadCategories().subscribe({
      next: (data) =>{
        console.log(data)
        this.categories=data
      },
      error:(error) =>{
        console.log(error)
        this.toast.error("ERROR IN LOADING CTAEGORIES")
      },
      complete:() =>{
        
      }
    })
  }

  getProducts(categoryId:any){
    let ob:any
    if(categoryId.trim() === 'all'){
      ob=this.product.loadProducts()
    }
    else{
      ob=this.product.loadProductsByCategory(categoryId)
    }

    ob.subscribe({
      next:(data:any) =>{
        console.log(data)
        this.products=data
      },
      error:(error:any) =>{
        console.log(error)
        this.toast.error("ERROR IN LOADING PRODUCTS")
      }
    })
  }
}
