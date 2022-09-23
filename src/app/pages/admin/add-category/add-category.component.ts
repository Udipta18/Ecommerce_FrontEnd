import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

 category=new Category('',0)

  constructor(
    private categoryService:CategoryService,
    private toast:ToastrService
  ) { }

  ngOnInit(): void {
  }

  submitCategory(event:any){
    event.preventDefault()
    console.log(this.category);


    this.categoryService.createCategory(this.category).subscribe({
      next:data =>{
        console.log("craeted category")
        console.log(data)
        this.toast.success("Category is created")
        this.category=new Category('',0)
      },

      error:error=>{
        console.log(error)
      }
    })
  }

}
