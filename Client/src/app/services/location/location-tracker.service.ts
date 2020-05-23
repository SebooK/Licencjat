import {Injectable, NgZone} from '@angular/core';
import {
    BackgroundGeolocation,
    BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClient} from "@angular/common/http";
import {VehiclesService} from "../Vehicles/vehicles.service";

@Injectable({
    providedIn: 'root'
})
export class LocationTrackerService {
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;
    private userLocation: {
        lng: number,
        lat: number,
        speed: number;
    };
    constructor(public zone: NgZone,
                public backgroundGeolocation: BackgroundGeolocation,
                public geolocation: Geolocation,
                private http: HttpClient,
                private vehicleService: VehiclesService) {

    }

     startTracking(id) {
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
                    this.userLocation = {
                        lng : this.lng,
                        lat : this.lat,
                        speed: location.speed
                    }
                    console.log(this.userLocation);

                    //zmienic trrzeba lat i  lng przypisac a nie cały obiekt
                    this.sendLocation(this.userLocation,id)
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

    sendLocation(location,id) {
        if(location.speed == undefined) {
            location.speed = 0;
        }

        this.vehicleService.editVehicle(id,{
            localization: `${location.lat} ${location.lng}`
        }).subscribe()
    }

    stopTracking() {
        console.log('stopTracking');

        this.backgroundGeolocation.stop().then(mess => {console.log(mess); console.log('stopped')});
       // this.watch.unsubscribe();

    }
}
