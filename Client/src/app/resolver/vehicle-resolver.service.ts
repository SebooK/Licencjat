import {Injectable} from '@angular/core';
import {VehiclesService} from "../services/Vehicles/vehicles.service";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Vehicle} from "../models/vehicle.model";
import {LoadingService} from "../services/Loading/loading.service";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class VehicleResolverService implements Resolve<Vehicle> {

    constructor(private vehiclesService: VehiclesService,
                private loadingController: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');

        this.loadingController.present();
        return this.vehiclesService.getVehicle(id).pipe(
            tap(() => {
                this.loadingController.dismiss()
            })
        )
    }
}
