import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {VehiclesService} from "../../services/Vehicles/vehicles.service";
import {environment} from "../../../environments/environment";
import {ModalController} from "@ionic/angular";
import {AddPage} from "./add/add.page";
import {Vehicle} from "../../models/vehicle.model";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";


@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
    url = environment.url;
    vehicles: Vehicle[];
    page = 1;
    constructor(private vehicleService: VehiclesService,
                private alertController: AlertController,
                private modalController: ModalController,
                private loadingController:LoadingService,
                private router: Router) {

        this.displayVehicles(event);

    }

    ngOnInit() {

    }

    displayVehicles(event?) {
        this.vehicleService
            .getVehicles(this.page)
            .subscribe(result => {
                this.vehicles = result;
                 console.log(this.vehicles);
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