import {Injectable} from '@angular/core';
import {WorkersService} from "../services/Workers/workers.service";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {LoadingService} from "../services/Loading/loading.service";
import {tap} from "rxjs/operators";
import {Worker} from "../models/worker.model"

@Injectable({
    providedIn: 'root'
})
export class WorkerResolverService implements Resolve<Worker> {

    constructor(private workersService: WorkersService,
                private loadingController: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');

        this.loadingController.present();
        return this.workersService.getWorker(id).pipe(
            tap(() => this.loadingController.dismiss())
        )
    }

}
