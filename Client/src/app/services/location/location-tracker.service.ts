import {Injectable, NgZone} from '@angular/core';
import {
    BackgroundGeolocation,
    BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation/ngx';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {filter} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class LocationTrackerService {
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;

    constructor(public zone: NgZone,
                public backgroundGeolocation: BackgroundGeolocation,
                public geolocation: Geolocation) {

    }

    startTracking() {
        //Background Tracking
        let config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000,
            stopOnTerminate:false,
        };


        this.backgroundGeolocation.configure(config).then( () => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
                .subscribe((location:BackgroundGeolocationResponse) => {
                    console.log('Background ');
                    console.log(location);
                    this.zone.run(() => {
                        this.lat = location.latitude;
                        this.lng = location.longitude;
                    });
                })
        })
            .catch(err => {
                console.log(err);
            });

        this.backgroundGeolocation.start();

        // Foreground Tracking
/*
        let options = {
            timeout: 3000,
            enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options).pipe(filter((p: any) => p.code === undefined)).subscribe((position: Geoposition) => {
            console.log('Foreground');
            console.log(position);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });

        });

 */
    }

    stopTracking() {
        console.log('stopTracking');

        this.backgroundGeolocation.stop().then(mess => {console.log(mess); console.log('stopped')});
       // this.watch.unsubscribe();

    }
}
