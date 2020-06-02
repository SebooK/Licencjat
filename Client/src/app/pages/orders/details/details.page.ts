import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Order} from "../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {AlertController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../services/Loading/loading.service";
import {AddPage} from "../add/add.page";
import {OrdersService} from "../../../services/Orders/orders.service";

import {SearchService} from "../../../services/geocoding/search.service";
import {MapPage} from "./map/map.page";
import {VehiclesService} from "../../../services/Vehicles/vehicles.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    private details: Order;
    private start;
    private end;
    private vehicle;
    constructor(private http: HttpClient,
                private alertController: AlertController,
                private ordersServices: OrdersService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private loading: LoadingService,
                private search: SearchService,
                private vehicleService: VehiclesService) {
    }

    ngOnInit() {
        console.log(this.activatedRoute.snapshot.data['orderDetails']);
        this.details = this.activatedRoute.snapshot.data['orderDetails'];
        this.search.forwardGeocode(this.details.loadingPlace).subscribe( res => this.start = res);
        this.search.forwardGeocode(this.details.unloadingPlace).subscribe(res => this.end = res);
        this.vehicleService.getVehicle(this.details.vehicle).subscribe(res =>this.vehicle = res);
    }


    displayOrderDetails() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.ordersServices.getOrder(id).subscribe(result => {
            this.details = result;
            console.log(this.details);

        }, error => {
            console.log(error);

        });
    }


    async editOrder() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: this.details

        });
        modal.onDidDismiss().then(res => this.displayOrderDetails());
        return await modal.present();
    }


    async showRoute() {
        const modal = await this.modalController.create({
            component: MapPage,
            componentProps: {unloadingPlace: this.start, loadingPlace: this.end, vehicle:this.vehicle},

        });
        modal.onDidDismiss().then( () => this.displayOrderDetails());
        return await modal.present();

    }
}
