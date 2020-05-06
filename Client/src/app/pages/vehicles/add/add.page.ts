import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehiclesService} from "../../../services/Vehicles/vehicles.service";
import {WorkersService} from "../../../services/Workers/workers.service";
import {Worker} from "../../../models/worker.model";


@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    vehicleForm: FormGroup;
    workers: Worker[];
    page = 1;
    details: {
        registrationNumber: string,
        vehicleNumber: string,
        vehicleType: string,
        localization: string,
        workerId: number,
    };


    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private vehiclesService: VehiclesService,
                private workersService: WorkersService,
                private navParams: NavParams,
                private toastController: ToastController) {
    }

    ngOnInit() {
        if (this.hasData() == false) {
            this.addVehicleForm();
        } else {
            this.editVehicleForm();
        }

        this.getWorkerData();
    }

    hasData() {
        this.details = {
            registrationNumber: this.navParams.get('registrationNumber'),
            vehicleNumber: this.navParams.get('vehicleNumber'),
            vehicleType: this.navParams.get('vehicleType'),
            localization: this.navParams.get('localization'),
            workerId: this.navParams.get('workerId'),
        };
        if ((this.details.registrationNumber ||
            this.details.vehicleNumber ||
            this.details.vehicleType ||
            this.details.localization || this.details.workerId) === undefined) {
            return false;
        } else return true;
    }

    addVehicleForm() {
        this.vehicleForm = this.formBuilder.group({
            registrationNumber: [``, Validators.required],
            vehicleNumber: [``, Validators.required],
            vehicleType: [``, Validators.required],
            localization: [``, Validators.required],
            workerId: [``, Validators.required]
        })
    }

    editVehicleForm() {
        this.vehicleForm = this.formBuilder.group({
            registrationNumber: [`${this.details.registrationNumber}`, Validators.required],
            vehicleNumber: [`${this.details.vehicleNumber}`, Validators.required],
            vehicleType: [`${this.details.vehicleType}`, Validators.required],
            localization: [`${this.details.localization}`, Validators.required],
            workerId: [`${this.details.workerId}`, Validators.required]
        })
    }

    onSubmit() {
        if (this.vehicleForm.invalid) {

        } else {
            console.log(this.vehicleForm.value);
            if (this.hasData() == true) {
                this.vehiclesService
                    .editVehicle(this.navParams.get('id'), this.vehicleForm.value)
                    .subscribe();
                return this.modalController.dismiss({'dissmised': true})
            }

            this.vehiclesService
                .addVehicle(this.vehicleForm.value)
                .subscribe();
            return this.modalController.dismiss({'dissmised': true})
        }
    }

    closeModal() {
        this.modalController.dismiss();
    }

    getWorkerData() {
        this.workersService.getWorkers(this.page)
            .subscribe(result => {
                this.workers = result
            });
    }
}
