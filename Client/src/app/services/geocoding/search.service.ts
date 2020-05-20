import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ToastController} from "@ionic/angular";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    routeUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/';
    limit = 'limit=1&';
    private address;

    constructor(private http: HttpClient,
                private toastController: ToastController) {
    }

    forwardGeocode(place) {
        return this.http.get<any>(`${this.url}/${place}.json?${this.limit}access_token=${environment.mapBoxAccessToken}`)
            .pipe(
                map(result => {

                    if ((result.features[0].id).includes('address')) {
                        this.address = result.features[0];
                        console.log(this.address);
                        return this.address
                    } else {
                        return console.log('Brak takiego adresu');
                    }
                }),
                catchError(this.handleError<any>('getPlace'))
            )
    }

    getRouteCoordinates(start, end) {

        return this.http
            .get(`${this.routeUrl}${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${environment.mapBoxAccessToken}`)
            .pipe(
                map(res => {
                    let json = JSON.parse(JSON.stringify(res))
                    let data = json.routes[0];
                    let route = data.geometry.coordinates;
                    let geojson = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        }
                    };
                    console.log(geojson)
                    return geojson
                }),
                catchError(this.handleError<any>('getRoute'))
            );

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
