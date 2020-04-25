import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemiTrailersPageRoutingModule } from './semi-trailers-routing.module';

import { SemiTrailersPage } from './semi-trailers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemiTrailersPageRoutingModule
  ],
  declarations: [SemiTrailersPage]
})
export class SemiTrailersPageModule {}
