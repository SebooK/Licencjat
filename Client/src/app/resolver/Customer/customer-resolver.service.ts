import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";
import {finalize, tap} from "rxjs/operators";
import {Customer} from "../../models/customer.model"
import { CustomersService} from "../../services/Customers/customers.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerResolverService implements Resolve<Customer> {

  constructor(private customersService: CustomersService,
              private loadingController: LoadingService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');

    this.loadingController.present();
    return this.customersService.getCustomer(id).pipe(
        tap(),
        finalize(() => this.loadingController.dismiss())
    )
  }
}
