import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  @Output()
 public loginLogoutEmitter:EventEmitter<boolean>=new EventEmitter()

  constructor() { }

  //login and whenever we login, the data will be stored in localstorage in a  map format
  login(data:any){
     localStorage.setItem("data",JSON.stringify(data))

     //an emitter will be thrown so that whatever subscribed the event that will get the value as true
     this.loginLogoutEmitter.emit(true)
  }

  //logout
  logout(){
    localStorage.removeItem("data")

    //an emitter will be thrown so that whatever subscribed the event that will get the value as false
    this.loginLogoutEmitter.emit(false)
  }

  //checklogin
  checkLogin(){
    let data = localStorage.getItem("data")
    if(data){

      //transforming string to object
     let ob=JSON.parse(data)
     if(ob.token && ob.user){
      return true
     }
    }
    return false
  }

  //getToken
  getToken(){
    if(this.checkLogin()){
      let data=localStorage.getItem("data")
      return data?JSON.parse(data).token:null
    }

    return null
  }

  //getCurrentUser
  getCurrentUser(){
    if(this.checkLogin()){
      let data=localStorage.getItem("data")
      return data?JSON.parse(data).user:null
    }
    return null
  }

  //check admin user
  checkAdminUser(): boolean {
    let user = this.getCurrentUser()
    let flag = null
    if (this.checkLogin()) {
      flag = user.roles.find((r: any) => r.id === 5245)
    }
    return flag ? true : false
  }
}
