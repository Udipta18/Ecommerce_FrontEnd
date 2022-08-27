import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
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

  constructor(private toast:ToastrService,
    private userService:UserService,
    private authhelper:AuthHelperService,
    private router:Router

    ) { }

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

          //save the data to localstorage
          this.authhelper.login(response)

          //navigate to dashboard
           this.router.navigate(['/dashboard'])




    },(error)=>{
      console.log(error)
      this.toast.error(error.error.message)
    },()=>{
      console.log("completed")
    })
  }

}
