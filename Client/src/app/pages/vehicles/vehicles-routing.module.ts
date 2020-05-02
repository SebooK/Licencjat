import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VehiclesPage} from './vehicles.page';
import {VehicleResolverService} from "../../resolver/vehicle-resolver.service";
import {AuthGuardService} from "../../services/Auth/auth-guard.service";

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
export class VehiclesPageRoutingModule {
}
