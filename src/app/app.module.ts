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
import { SearchComponent } from './components/search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ViewProductsComponent } from './pages/admin/view-products/view-products.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import {MaterialModule} from '../material-module';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ManageOrderComponent } from './pages/admin/manage-order/manage-order.component';
import {WindowRef} from "./services/WindoeRef";

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
    OrdersComponent,
    SearchComponent,
    ViewProductComponent,
    AdminDashboardComponent,
    AddProductComponent,
    ViewProductsComponent,
    UpdateProductComponent,
    AdminHomeComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
    ManageOrderComponent
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
    NgProgressHttpModule,
    Ng2SearchPipeModule,
    MaterialModule
   

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    },
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
