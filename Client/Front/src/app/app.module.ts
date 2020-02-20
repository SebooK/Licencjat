import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from "./home/home.page";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./user.service";

@NgModule({
  declarations: [
      AppComponent,

  ],
  entryComponents: [],
  imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(),
      AppRoutingModule,
  ],
  providers: [

    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
