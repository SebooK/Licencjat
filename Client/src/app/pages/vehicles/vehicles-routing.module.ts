import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VehiclesPage} from './vehicles.page';

const routes: Routes = [
    {
        path: '',
        component: VehiclesPage
    },
    {
        path: 'details/:id',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesPageRoutingModule {
}
