import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from "./services/Auth/auth.service";
import {Router} from "@angular/router";
import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig,
    BackgroundGeolocationEvents, BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation/ngx"
import {} from "@ionic-native/background-geolocation";

declare var window;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router) {

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.authService.authenticationState.subscribe(state => {
                if (state) {
                    this.router.navigate(['home']);

                } else {
                    this.router.navigate(['login']);
                }
            });
        });
    }
}

