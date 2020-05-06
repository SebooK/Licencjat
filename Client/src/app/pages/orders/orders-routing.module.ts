import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdersPage} from './orders.page';
import {OrdersResolverService} from "../../resolver/Orders/orders-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    },
    {
        path: 'details/:id',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
        resolve: {
            orderDetails: OrdersResolverService
        }
    },
    {
        path: 'add',
        loadChildren: () => import('./add/add.module').then(m => m.AddPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersPageRoutingModule {
}
