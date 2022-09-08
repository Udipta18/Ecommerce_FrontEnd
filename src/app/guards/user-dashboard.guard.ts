import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from '../services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardGuard implements CanActivate {
     
   
    constructor(private authHelper:AuthHelperService,
                private router:Router
      ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    /* this portion basically used for guarding like if u are not login then u can't use the dashboard and if if u hit dashboard url it will 
    direct u to login page first
 */
      if(this.authHelper.checkLogin()){
        return true
      }
  
        this.router.navigate(["/login"],{   queryParams:{message:'You not logged in !! Login First'}})

        return false;
  }
  
}
