import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlertController, ToastController} from "@ionic/angular";
import {environment} from "../../../environments/environment";
import {tap, catchError, map} from "rxjs/operators";
import {SemiTrailer} from "../../models/semiTrailers.model";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SemiTrailerService {

    url = environment.url;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    private semiTrailersUrl = this.url + '/api/semiTrailers';

    constructor(private http: HttpClient,
                private alertController: AlertController,
                private toastController: ToastController) {
    }

    getSemiTrailers(page): Observable<SemiTrailer[]> {
        return this.http.get<SemiTrailer[]>(`${this.semiTrailersUrl}/${page}`)
            .pipe(
                map(data => data['result'].map((semiTrailer: SemiTrailer) => new SemiTrailer().deserialize(semiTrailer))),
                catchError(this.handleError<SemiTrailer[]>('getSemiTrailers', []))
            );
    }

    getSemiTrailer(id): Observable<SemiTrailer> {
        const url = `${this.url}/api/semiTrailer/${id}`;
        return this.http.get<SemiTrailer>(url).pipe(
            map((semiTrailer: SemiTrailer) => new SemiTrailer().deserialize(semiTrailer)),
            catchError(this.handleError<SemiTrailer>(`Get SemiTrailer id=${id}`))
        )
    }

    addSemiTrailer(data): Observable<any> {
        return this.http.post<any>(this.semiTrailersUrl, data, this.httpOptions).pipe(
            tap(res => {
                return this.toastController.create({
                    message: 'Semi Trailer was added successfully',
                    duration: 3000,
                    position: 'top',
                    color: "success"
                }).then(toast => {
                    toast.present();
                })
            }),
            catchError(this.handleError<any>(''))
        )
    }

    editSemiTrailer(id, data): Observable<any> {
        const url = `${this.url}/api/semiTrailer/${id}`;
        return this.http.put<any>(url, data, this.httpOptions).pipe(
            tap(res => {
                console.log('SemiTrailer edited:' + data);
            }),
            catchError(this.handleError<any>(''))
        )
    }

    deleteVehicle(id): Observable<any> {
        const url = `${this.semiTrailersUrl}/${id}`;

        return this.http.delete<any>(url).pipe(
            tap(result => {
                return this.toastController.create({
                    message: 'SemiTrailer was deleted successfully',
                    duration: 3000,
                    position: 'top',
                    color: "success"
                }).then(toast => {
                    toast.present();
                })
            }),
            catchError(this.handleError<any>(''))
        )
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.toastController.create({
                header: 'Error',
                message: error,
                color: 'danger',
                duration: 3000,
                position: "top"
            }).then(r => r.present());
            console.log(error);
            return of(result as T);
        }
    }
}
