import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {WorkersService} from "../../services/Workers/workers.service";
import {LoadingService} from "../../services/Loading/loading.service";
import {Worker} from "../../models/worker.model"
@Injectable({
    providedIn: 'root'
})
export class MeResolverService implements Resolve<Worker> {

    constructor(private workersService: WorkersService,
                private  loadingController: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
      return this.workersService.getMe();

    }
}
