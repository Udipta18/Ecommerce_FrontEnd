import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServicesComponent } from './components/services/services.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgProgressModule } from 'ngx-progressbar';
import {NgProgressHttpModule} from "ngx-progressbar/http";


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    ServicesComponent,
    SignupComponent,
    CustomNavbarComponent,
    ProfileComponent,
    UserDashboardComponent,
    StoreComponent,
    ProductComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule, 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    InfiniteScrollModule,
    MatIconModule,
    MatButtonModule,
    NgProgressModule,
    NgProgressHttpModule

   

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
