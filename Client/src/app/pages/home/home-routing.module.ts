import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import {MeResolverService} from "../../resolver/me/me-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'me',
    resolve: {
      user:MeResolverService
    },
    loadChildren: () => import ('../me/me.module').then(m => m.MePageModule),

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
