import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {VehiclesService} from "../../services/vehicles.service";
import {environment} from "../../../environments/environment";
import {ModalController} from "@ionic/angular";
import {AddPage} from "./add/add.page";

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
    url = environment.url;
    vehicles = [];
    page = 1;

    constructor(private vehicleService: VehiclesService,
                private alertController: AlertController,
                private modalController: ModalController) {
        this.displayVehicles(event);
    }

    ngOnInit() {

    }

    displayVehicles(event?) {
        this.vehicleService
            .getVehicles(this.page)
            .subscribe(result => {
                this.vehicles = this.vehicles.concat(result['result']);
                if (event) {
                    event.taget.complete();
                }
            });
    }

    displayMore(event) {
        console.log(event);
        this.page++;
        this.displayVehicles(event);

        if (this.page === this.vehicles['pages']) {
            event.target.disabled = true;
        }
    }

    async addVehicles() {
        const modal = await this.modalController.create({
            component: AddPage
        });
        modal.onDidDismiss().then(res => this.displayVehicles(event));
        return await modal.present();
    }

    async deleteVehicle(id) {
        console.log(id);
        const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Are you sure you want to delete this vehicle?',
            buttons: [{
                text: 'No',
                role: 'cancel',
            }, {
                text: 'Yes',
                handler: () => {
                    this.vehicleService.deleteVehicle(id).subscribe();
                    return this.alertController.dismiss();
                }
            }]
        });
        await alert.present();
    }
}