import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AddPage} from "./pages/workers/add/add.page";
import {AppRoutingModule} from './app-routing.module';
import {HTTP} from "@ionic-native/http/ngx";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation/ngx";
import {LocationTrackerService} from "./services/location/location-tracker.service";
import {Geolocation} from "@ionic-native/geolocation/ngx";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/Auth/auth.interceptor";


export function jwtOptionsFactory(storage) {
    return {
        tokenGetter: () => {
            return storage.get('access_token');
        },
        whitelistedDomains: ['localhost:8000','192.168.0.171:8000','192.168.0.171:8100','10.0.2.2:8000','http://29a31d7b83f7.ngrok.io']
    }
}

@NgModule({
    declarations: [AppComponent, AddPage],
    entryComponents: [AddPage],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Storage],
            }
        }), ReactiveFormsModule],
    providers: [
        LocationTrackerService,
        BackgroundGeolocation,
        Geolocation,
        StatusBar,
        SplashScreen,
        HTTP,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
