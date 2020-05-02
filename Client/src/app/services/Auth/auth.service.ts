import {Platform, AlertController, NavController} from "@ionic/angular";
import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { JwtHelperService} from "@auth0/angular-jwt";
import {Storage} from "@ionic/storage";
import {environment} from "../../../environments/environment";
import {tap, catchError} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {ErrorHandler,NgModule} from "@angular/core";
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient,
              private helper: JwtHelperService,
              private storage: Storage,
              private plt: Platform,
              private alertController: AlertController,
              private navCtrl:NavController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decode = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if(!isExpired) {
          this.user = decode;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  getToken() {
    return this.storage.get(TOKEN_KEY);
  }

   login(credentials) {
    return this.http.post(`${this.url}/api/login`,credentials).pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['JSON-Web-Token']);
          this.user = this.helper.decodeToken(res['JSON-Web-Token']);
          this.authenticationState.next(true);
          console.log(this.user);
        }),
        catchError(e  => {
          this.showAlert(e.error);
          throw new Error(e);
        })
    )
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then( () => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;

  }


  showAlert(msg){
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

}
