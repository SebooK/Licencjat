import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";
import {finalize, tap} from "rxjs/operators";
import {Order} from "../../models/order.model"
import {OrdersService} from "../../services/Orders/orders.service";
import {SearchService} from "../../services/geocoding/search.service";

@Injectable({
    providedIn: 'root'
})
export class OrdersResolverService implements Resolve<Order> {
       private details;
       private start;
       private end;
    constructor(private ordersService: OrdersService,
                private loadingController: LoadingService,
                private search: SearchService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');

        return this.ordersService.getOrder(id).pipe(
            tap())





    }
}
