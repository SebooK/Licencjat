import {Component, OnInit} from '@angular/core';
import {Order} from "../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {AlertController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../services/Loading/loading.service";
import {AddPage} from "../add/add.page";
import {OrdersService} from "../../../services/Orders/orders.service";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    private details: Order;

    constructor(private http: HttpClient,
                private alertController: AlertController,
                private ordersServices: OrdersService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private loading: LoadingService) {
    }

    ionViewDidEnter() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYTk3ODEiLCJhIjoiY2thOWU3YWswMGx4bjJ6bXR3dzB0bWRtaCJ9.eblrxW8xIgV_5Ads1bz4SA';
        var map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/light-v9',
            center: [-74.0066, 40.7135],
            zoom: 16,
            pitch: 80,
            minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
            maxZoom: 17,
            container: 'map'
        })
    }

    ngOnInit() {
        console.log(this.activatedRoute.snapshot.data['orderDetails']);
        this.details = this.activatedRoute.snapshot.data['orderDetails'];
    }

    displayOrderDetails() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.ordersServices.getOrder(id).subscribe(result => {
            this.details = result;
            console.log(this.details);
            this.loading.dismiss();
        }, error => {
            console.log(error);
            this.loading.dismiss();
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


}
