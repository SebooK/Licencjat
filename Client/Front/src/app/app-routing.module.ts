import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'manage-users',
    loadChildren: () => import('./manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  },
  {
    path: 'manage-orders',
    loadChildren: () => import('./manage-orders/manage-orders.module').then( m => m.ManageOrdersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
