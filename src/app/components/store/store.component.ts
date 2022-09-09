import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Routes } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  categories: any
  products: any;
  categoryId:any


  constructor(
    private category: CategoryService,
    private product: ProductService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((values: any) => {
      console.log(values.categoryId);
      this.products=undefined
       this.pageNumber=0
       console.log(this.pageNumber)
      this.categoryId=values.categoryId
      this.getProducts(values.categoryId,this.pageNumber,this.pageSize)

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

  getProducts(categoryId:any,pageNumber:any,pageSize:any){
    let ob:any
    if(categoryId.trim() === 'all'){
      ob=this.product.loadProducts(pageSize=pageSize,pageNumber=pageNumber)
    }
    else{
      ob=this.product.loadProductsByCategory(categoryId,pageSize=pageSize,pageNumber=pageNumber)
    }

    ob.subscribe({
      next:(data:any) =>{
        console.log(data)
        if(this.products){
          this.products.content=this.products.content.concat(data.content)
          this.products.lastPage = data.lastPage
          this.products.pageNumber = data.pageNumber
          this.products.pageSize = data.pageSize
          this.products.totalElements = data.totalElements
          this.products.totalPages = data.totalPages
        }
        else{
          this.products=data
        }

        this.loading=false
        
      },
      error:(error:any) =>{
        console.log(error)
        this.toast.error("ERROR IN LOADING PRODUCTS")
        this.loading=false
      }
    })
  }

 pageNumber=0
 pageSize=5
 loading=false
  onScroll(){
    //console.log("page scrolled")

    if(this.products.lastPage){
      console.log("Last Page Arrived")
      return
    }

        this.loading=true

      setTimeout(() => {
        this.pageNumber=this.pageNumber+1
     console.log("page scrolled" +this.pageNumber)
   this.getProducts(this.categoryId,this.pageNumber,this.pageSize)
      }, 1000);


      
  }

  addToCart(product:any){
    console.log(event)
    this.cartService.addItemToCart(product.productId,1).subscribe({
      next:data=>{
        console.log(data);
        this.toast.success("Item added to card")

      },
      error:error=>{
        console.log(error);
        this.toast.error("Error while adding to cart")

      }
    })
  }
}
