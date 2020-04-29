import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VehiclesPage} from './vehicles.page';
import {VehicleResolverService} from "../../resolver/vehicle-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: VehiclesPage,

    },
    {
        path: 'details/:id',
        resolve:{
            vehicleDetails: VehicleResolverService
        },
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesPageRoutingModule {
}
