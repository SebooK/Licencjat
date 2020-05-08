import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";
import {finalize, tap} from "rxjs/operators";
import {Order} from "../../models/order.model"
import {OrdersService} from "../../services/Orders/orders.service";

@Injectable({
    providedIn: 'root'
})
export class OrdersResolverService implements Resolve<Order> {

    constructor(private ordersService: OrdersService,
                private loadingController: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');

        this.loadingController.present();
        return this.ordersService.getOrder(id).pipe(
            tap(),
            finalize(() => this.loadingController.dismiss()))
    }
}
