import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersPage } from './customers.page';
import {CustomerResolverService} from "../../resolver/Customer/customer-resolver.service";
import {AuthGuardService} from "../../services/Auth/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: CustomersPage
  },
  {
    path:'details/:id',
    resolve: {
      customerDetails: CustomerResolverService
    },
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddPageModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersPageRoutingModule {}
