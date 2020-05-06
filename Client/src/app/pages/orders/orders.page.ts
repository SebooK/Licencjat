import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Order} from "../../models/order.model";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AddPage} from "./add/add.page";
import {OrdersService} from "../../services/Orders/orders.service";


@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

    url = environment.url;
    orders: Order[];
    page = 1;

    constructor(private platform: Platform,
                private http: HttpClient,
                private alertController: AlertController,
                private modalController: ModalController,
                private router: Router,
                private ordersService: OrdersService) {

    }

    ngOnInit() {
        this.displayOrders(event);
    }

    displayOrders(event?) {
        this.ordersService
            .getOrders(this.page)

            .subscribe(result => {
                this.orders = result;
                if (event) {
                    event.target.complete();
                }
            });
    }

    displayMore(event) {
        console.log(event);
        +
            this.page++;
        this.displayOrders();

        if (this.page === this.orders['pages']) {
            event.target.disabled = true;
        }
    }

    async addOrderModal() {
        const modal = await this.modalController.create({
            component: AddPage
        });
        modal.onDidDismiss().then(res => this.displayOrders());
        return await modal.present();
    }

    async deleteOrder(id) {
        console.log(id);
        const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Are you sure to delete this order?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.ordersService.deleteOrder(id).subscribe();
                        return this.alertController.dismiss();
                    }
                }]
        });
        alert.onDidDismiss().then(res => this.displayOrders());

        await alert.present();
    }


}
