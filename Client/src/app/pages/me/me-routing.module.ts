import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MePage} from './me.page';
import {MeResolverService} from "../../resolver/me/me-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: MePage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MePageRoutingModule {
}
