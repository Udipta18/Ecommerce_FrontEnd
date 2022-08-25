import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    username:'',
    password:''
  }

  constructor(private toast:ToastrService,private userService:UserService) { }

  ngOnInit(): void {
  }

  submitLoginRequest(event:any){
    console.log(this.loginData)
    if(this.loginData.username.trim()===''){
      this.toast.error("Username is Required !!!")
      return
    }

    if(this.loginData.password.trim()===''){
      this.toast.error("Password is Required!!!")
      return
    }

    //login request
    this.userService.generateToken(this.loginData).subscribe((response) =>{
          console.log(response)
          this.toast.success("LOGIN SUCCESS")
    },(error)=>{
      console.log(error)
      this.toast.error(error.error.message)
    },()=>{
      console.log("completed")
    })
  }

}
