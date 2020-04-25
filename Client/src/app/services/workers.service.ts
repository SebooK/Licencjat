import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platform, ToastController} from "@ionic/angular";
import {environment} from "../../environments/environment";
import {AlertController} from "@ionic/angular";
import {tap, catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
@Injectable({
    providedIn: 'root'
})
export class WorkersService {

    url = environment.url;
    httpOptions = {
        headers:  new HttpHeaders({'Content-Type': 'application/json'})
    };
    private workersUrl = this.url+'/api/workers';


    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private toastController: ToastController,
        private auth:AuthService) { }

    getWorkers(page): Observable<any> {
        return this.http.get<any>(`${this.workersUrl}/${page}`)
            .pipe(
                tap(_ => console.log('fetched workers')),
                catchError(this.handleError<Worker[]>('getWorkers', []))
            );
    }

    getWorker(id): Observable<any>{
        const url = `${this.workersUrl}/worker/${id}`;
        return this.http.get<any>(url).pipe(
            tap(),
            catchError(this.handleError<Worker>(`getWorker id=${id}`))
        )
    }

    addWorker(data): Observable<Worker>{
        return this.http.post<Worker>(this.workersUrl, data, this.httpOptions).pipe(
            tap(res => {
                return this.toastController.create({
                    message:'User was added successfully',
                    duration:3000,
                    position:'top',
                    color:"success"
                }).then( toast => { toast.present();})
            }),
            catchError(this.handleError<Worker>(''))
    )}

    editWorker(id,data): Observable<Worker>{
        const url =  `${this.workersUrl}/${id}`;
        return this.http.put<Worker>(url,data,this.httpOptions).pipe(
            tap( res =>{
                console.log('Worker edited:' + data);
            }),
            catchError(this.handleError<Worker>(''))
        )}
    deleteWorker(id): Observable<any>{
        const url =  `${this.workersUrl}/${id}`;

        return this.http.delete<Worker>(url).pipe(
            tap(result => {
                return this.toastController.create({
                    message:'User was deleted successfully',
                    duration:3000,
                    position:'top',
                    color:"success"
                }).then( toast => { toast.present();})
             }),
            catchError(this.handleError<Worker>(''))
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
