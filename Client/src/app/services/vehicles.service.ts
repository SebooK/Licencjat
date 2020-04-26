import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ToastController} from "@ionic/angular";
import {environment} from "../../environments/environment";
import {AlertController} from "@ionic/angular";
import {tap, catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url = environment.url;
  httpOptions = {
    headers:  new HttpHeaders({'Content-Type': 'application/json'})
  };
  private vehiclesUrl = this.url+'/api/vehicles';


  constructor(
      private http: HttpClient,
      private alertController: AlertController,
      private toastController: ToastController,
      private auth:AuthService) { }

  getVehicles(page): Observable<any> {
    return this.http.get<any>(`${this.vehiclesUrl}/${page}`)
        .pipe(
            tap(_ => console.log('fetched vehicles')),
            catchError(this.handleError<any>('getWorkers', []))
        );
  }

  getVehicle(id): Observable<any>{
    const url = `${this.url}/api/vehicle/${id}`;
    return this.http.get<any>(url).pipe(
        tap(res => console.log(res)),
        catchError(this.handleError<any>(`Get Vehicle id=${id}`))
    )
  }

  addVehicle(data): Observable<any>{
    return this.http.post<any>(this.vehiclesUrl, data, this.httpOptions).pipe(
        tap(res => {
          return this.toastController.create({
            message:'Vehicle was added successfully',
            duration:3000,
            position:'top',
            color:"success"
          }).then( toast => { toast.present();})
        }),
        catchError(this.handleError<any>(''))
    )}

  editVehicle(id,data): Observable<any>{
    const url =  `${this.vehiclesUrl}/${id}`;
    return this.http.put<any>(url,data,this.httpOptions).pipe(
        tap( res =>{
          console.log('Vehicle edited:' + data);
        }),
        catchError(this.handleError<any>(''))
    )}
  deleteVehicle(id): Observable<any>{
    const url =  `${this.vehiclesUrl}/${id}`;

    return this.http.delete<any>(url).pipe(
        tap(result => {
          return this.toastController.create({
            message:'Vehicle was deleted successfully',
            duration:3000,
            position:'top',
            color:"success"
          }).then( toast => { toast.present();})
        }),
        catchError(this.handleError<any>(''))
    )
  }

  private  handleError<T>(operation = 'operation', result?:T) {
    return (error:any) : Observable<T> => {
      this.toastController.create({
        header: 'Error',
        message: error.error,
        color:'danger',
        duration:3000,
        position:"top"
      }).then(r => r.present());
      return of(result  as T);
    }
  }
}
