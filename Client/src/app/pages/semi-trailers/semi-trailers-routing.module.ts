import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemiTrailersPage } from './semi-trailers.page';
import {AuthGuardService} from "../../services/Auth/auth-guard.service";
import {SemiTrailerResolverService} from "../../resolver/semi-trailer-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: SemiTrailersPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),
    resolve: {
      semiTrailerDetails: SemiTrailerResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemiTrailersPageRoutingModule {}
