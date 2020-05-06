import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrdersPageRoutingModule} from './orders-routing.module';

import {OrdersPage} from './orders.page';
import {AddPage} from "./add/add.page";
import {NgArrayPipesModule} from "ngx-pipes";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrdersPageRoutingModule,
        ReactiveFormsModule,
        NgArrayPipesModule
    ],
    declarations: [OrdersPage, AddPage],
    entryComponents: [AddPage]
})
export class OrdersPageModule {
}
