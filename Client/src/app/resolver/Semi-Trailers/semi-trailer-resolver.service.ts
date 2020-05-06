import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";
import {tap} from "rxjs/operators";
import {SemiTrailer} from "../../models/semiTrailers.model";
import {SemiTrailerService} from "../../services/semiTrailers/semi-trailer.service";

@Injectable({
    providedIn: 'root'
})
export class SemiTrailerResolverService implements Resolve<SemiTrailer> {

    constructor(private semiTrailerService: SemiTrailerService,
                private loadingController: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');

        this.loadingController.present();
        return this.semiTrailerService.getSemiTrailer(id).pipe(
            tap(() => this.loadingController.dismiss())
        )
    }
}
