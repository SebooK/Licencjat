import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkersPage} from './workers.page';
import {WorkerResolverService} from "../../resolver/worker-resolver.service";
import {AuthGuardService} from "../../services/Auth/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        component: WorkersPage
    },
    {
        path: 'details/:id',
        resolve: {
            workerDetails: WorkerResolverService
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
export class WorkersPageRoutingModule {
}
