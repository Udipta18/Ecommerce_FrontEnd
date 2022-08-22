import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url='http://localhost:8081'

  constructor(private httpClient:HttpClient) { }

  createUser(user:any){
    return this.httpClient.post(`${this.base_url}/users/`,user)
  }
}
