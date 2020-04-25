import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemiTrailersPage } from './semi-trailers.page';

const routes: Routes = [
  {
    path: '',
    component: SemiTrailersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemiTrailersPageRoutingModule {}
