import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platform, ToastController} from "@ionic/angular";
import {environment} from "../../../environments/environment";
import {AlertController} from "@ionic/angular";
import {tap, catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AuthService} from "../Auth/auth.service";
import {Worker} from "../../models/worker.model"
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

    getMe(): Observable<Worker> {
        return this.http.get<Worker>(`${this.workersUrl}/me`).pipe(
            tap( res => console.log(res)),
            catchError(this.handleError<Worker>('GetMe'))
        )
    }

    getWorkers(page): Observable<Worker[]> {
        return this.http.get<Worker[]>(`${this.workersUrl}/${page}`)
            .pipe(
                map(data => data['result'].map(res => Object.assign(new Worker(), res))),
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
                console.log('Worker edited:' + res);
                return this.toastController.create({
                    message:'User was edited successfully',
                    duration:3000,
                    position:'top',
                    color:"success"
                }).then( toast => { toast.present();})
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
             console.log(error);
            return of(result  as T);
        }
    }
}
