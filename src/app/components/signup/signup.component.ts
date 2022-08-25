import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  status={
    errorstatus:false,
    errormessage:{
      name:null,
      email:null,
      password:'',
      about:'',
      phone:''

    }
  }

  user = {
    name: '',
    email: '',
    password: '',
    address: '',
    about: '',
    phone: '',
    gender: ''
  }

  constructor( private UserService:UserService,private toast:ToastrService)  { }

  ngOnInit(): void {
  }

  submitForm(event: any) {

    event.preventDefault();
    console.log(this.user);
    if (this.user.name.trim() === '') {
      this.toast.error("username is blank!!")
      return;
    } else if (this.user.email.trim() === '') {
      this.toast.error("email is blank !!")
      return;

    }

    //submit the form
    this.UserService.createUser(this.user).subscribe((success)=>{
            console.log(success)
            this.toast.success("user is registered successfully !! ")
    },(error)=>{
          console.log(error)
          if(error.status==400){
            //alert("validation error")
            console.log(error.error)

            this.status.errormessage=error.error
            this.status.errorstatus=true
          }
  
    },() =>{
       console.log('completed');
    })
  }

}
