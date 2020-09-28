import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/Auth/auth.service";
import {Storage} from "@ionic/storage";
import {ModalController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkersService} from "../../services/Workers/workers.service";
import {Worker} from "../../models/worker.model"
import {MePage} from "../me/me.page";
import {LocationTrackerService} from "../../services/location/location-tracker.service";
import {VehiclesService} from "../../services/Vehicles/vehicles.service";
import {Plugins} from '@capacitor/core';
import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig,
    BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation/ngx";


const {LocalNotifications} = Plugins;

declare var window;

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    arr: any;
    locations: any;
    isTracking: boolean = false;
    config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates,
        interval: 1000,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled'
    };

    constructor(private authService: AuthService,
                private storage: Storage,
                private route: Router,
                private workersService: WorkersService,
                private vehiclesService: VehiclesService,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private toastController: ToastController,
                private  backgroundGeolocation: BackgroundGeolocation,
                private locationTracker: LocationTrackerService) {
        this.locations = [];
        this.arr = [];
    }

    private user: Worker;

    ngOnInit() {
        this.user = this.activatedRoute.snapshot.data['user'];
        console.log(this.user.id)
    }

    logout() {
        this.authService.logout();
    }

    workersPage() {
        return this.route.navigate(['workers']);
    }

    ordersPage() {
        return this.route.navigate(['orders']);
    }

    vehiclePage() {
        return this.route.navigate(['vehicles']);
    }

    semiTrailerPage() {
        return this.route.navigate(['semi-trailers']);
    }

    customersPage() {
        return this.route.navigate(['customers']);
    }

    aboutMe() {
        const modal = this.modalController.create({
            component: MePage,
            componentProps: {
                user: this.user
            }
        }).then(me => me.present());

    }

    start() {
        console.log(this.user.vehicle.id);
        this.locationTracker.startTracking(this.user.vehicle.id);
        this.isTracking =true
    }

    stop() {
        this.locationTracker.stopTracking();
        this.isTracking = false
    }
}
