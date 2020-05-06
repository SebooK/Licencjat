import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersPageRoutingModule } from './customers-routing.module';

import { CustomersPage } from './customers.page';
import {AddPage} from "./add/add.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CustomersPage,AddPage],
  entryComponents: [AddPage]
})
export class CustomersPageModule {}
