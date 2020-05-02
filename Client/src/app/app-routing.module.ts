import {AuthGuardService} from "./services/Auth/auth-guard.service";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MeResolverService} from "./resolver/me/me-resolver.service";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService],
    resolve: {
      user: MeResolverService
    }
  },
  {
    path: 'workers',
    loadChildren: () => import('./pages/workers/workers.module').then( m => m.WorkersPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/vehicles/vehicles.module').then( m => m.VehiclesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'semi-trailers',
    loadChildren: () => import('./pages/semi-trailers/semi-trailers.module').then( m => m.SemiTrailersPageModule)
  },
  {
    path: 'me',
    loadChildren: () => import('./pages/me/me.module').then( m => m.MePageModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
