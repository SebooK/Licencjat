import {Platform, AlertController, NavController, ToastController} from "@ionic/angular";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Storage} from "@ionic/storage";
import {environment} from "../../../environments/environment";
import {tap, catchError, finalize} from "rxjs/operators";
import {BehaviorSubject,} from "rxjs";
import {LoadingService} from "../Loading/loading.service";

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
                private navCtrl: NavController,
                private loadingController: LoadingService,
                private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(token => {
            if (token) {
                let decode = this.helper.decodeToken(token);
                let isExpired = this.helper.isTokenExpired(token);

                if (!isExpired) {
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
        this.loadingController.present();
        return this.http.post(`${this.url}/api/login`, credentials).pipe(
            tap(res => {
                this.storage.set(TOKEN_KEY, res['JSON-Web-Token']);
                this.user = this.helper.decodeToken(res['JSON-Web-Token']);
                this.authenticationState.next(true);
                console.log(this.user);
            }),
            finalize(() => {
                this.loadingController.dismiss();
                this.toastController.create({
                    message: 'log in successfully',
                    duration: 1000,
                    position: 'bottom',
                    color: "success"
                }).then(toast => toast.present());
            }),
            catchError(e => {
                console.log(e.error);
                this.showAlert(e.error);

                throw new Error(e);
            })
        )
    }

    logout() {
        this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            return this.toastController.create({
                message: 'log out successfully',
                duration: 3000,
                position: 'top',
                color: "success"
            }).then(toast => toast.present());
        })
    }

    isAuthenticated() {
        return this.authenticationState.value;

    }


    showAlert(msg) {
        let alert = this.alertController.create({
            message: msg,
            header: 'Error',
            buttons: ['OK']
        });
        alert.then(alert => alert.present());
    }

}
