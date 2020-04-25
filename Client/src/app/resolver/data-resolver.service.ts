import { Injectable } from '@angular/core';
import {WorkersService} from "../services/workers.service";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements  Resolve<any>{

  constructor(private workersService: WorkersService) { }

  resolve(route: ActivatedRouteSnapshot){
    let id = route.paramMap.get('id');
    return this.workersService.getWorker(id);
  }
}
