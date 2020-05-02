import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VehiclesPageRoutingModule} from './vehicles-routing.module';

import {VehiclesPage} from './vehicles.page';
import {AddPage} from "./add/add.page";
import {NgArrayPipesModule} from "ngx-pipes";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VehiclesPageRoutingModule,
        ReactiveFormsModule,
        NgArrayPipesModule,
    ],
    declarations: [VehiclesPage,AddPage],
    entryComponents: [AddPage]
})
export class VehiclesPageModule {
}
