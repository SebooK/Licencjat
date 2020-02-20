import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any;

  constructor(public http: HttpClient) {
    this.users  = null;
  }

  getUsers() {
    if(this.users) {
      return Promise.resolve(this.users);
    }

    return new Promise(resolve => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:4000/api/users')
            .pipe(map(data => {}))
            .subscribe(users => {
              this.users = users;
              resolve(this.users);
            });
    });
  }
}
