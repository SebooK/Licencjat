import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {VehiclesService} from "../../../services/Vehicles/vehicles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddPage} from "../../vehicles/add/add.page";
import {Vehicle} from "../../../models/vehicle.model";
import {LoadingService} from "../../../services/Loading/loading.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    url = environment.url;
    private details: Vehicle;

    constructor(private platform: Platform,
                private http: HttpClient,
                private alertController: AlertController,
                private vehiclesService: VehiclesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private loading: LoadingService
    ) {
    }


    ngOnInit() {
        console.log(this.activatedRoute.snapshot.data['vehicleDetails']);
        this.details = this.activatedRoute.snapshot.data['vehicleDetails'];
    }

    displayVehicleDetails() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.vehiclesService.getVehicle(id).subscribe(result => {
            this.details = result;
            console.log(this.details);
            this.loading.dismiss();
        }, error => {
            console.log(error);
            this.loading.dismiss();
        });
    }


    async editVehicleModal() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: this.details

        });
        modal.onDidDismiss().then(res => this.displayVehicleDetails());
        return await modal.present();
    }

}