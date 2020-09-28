import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DetailsPage} from './details.page';

const routes: Routes = [
    {
        path: '',
        component: DetailsPage
    },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule),

  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailsPageRoutingModule {
}
