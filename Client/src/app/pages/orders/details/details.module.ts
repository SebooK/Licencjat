import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetailsPageRoutingModule} from './details-routing.module';

import {DetailsPage} from './details.page';
import {MapPage} from "./map/map.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailsPageRoutingModule
    ],
    declarations: [DetailsPage,MapPage],
    entryComponents: [MapPage]
})
export class DetailsPageModule {
}
