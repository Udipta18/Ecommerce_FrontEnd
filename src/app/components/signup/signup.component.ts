import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    address: '',
    about: '',
    phone: '',
    gender: ''
  }

  constructor( private UserService:UserService)  { }

  ngOnInit(): void {
  }

  submitForm(event: any) {

    event.preventDefault();
    console.log(this.user);
    if (this.user.name.trim() === '') {
      alert("username is blank!!")
      return;
    } else if (this.user.email.trim() === '') {
      alert("email is blank !!")
      return;

    }

    //submit the form
    this.UserService.createUser(this.user).subscribe((success)=>{
            console.log(success)
            alert("user is registered successfully !! ")
    },(error)=>{
          console.log(error)
          if(error.status==400){
            alert("validation error")
          }
  
    })
  }

}
