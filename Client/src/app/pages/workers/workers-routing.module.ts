import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkersPage } from './workers.page';
import {DataResolverService} from "../../resolver/data-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: WorkersPage
  },
  {
    path: 'details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkersPageRoutingModule {}
