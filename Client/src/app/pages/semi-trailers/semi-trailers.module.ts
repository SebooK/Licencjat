import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemiTrailersPageRoutingModule } from './semi-trailers-routing.module';

import { SemiTrailersPage } from './semi-trailers.page';
import {AddPage} from "./add/add.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemiTrailersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SemiTrailersPage,AddPage],
  entryComponents: [AddPage]
})
export class SemiTrailersPageModule {}
