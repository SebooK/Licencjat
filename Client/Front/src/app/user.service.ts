import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any;




  constructor(public http: HttpClient) {
    this.users  = null;
  }


}
