import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavParams} from "@ionic/angular";
import {OrdersService} from "../../../services/Orders/orders.service";
import {WorkersService} from "../../../services/Workers/workers.service";
import {CustomersService} from "../../../services/Customers/customers.service";
import {Customer} from "../../../models/customer.model";
import {Worker} from "../../../models/worker.model"

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    ordersForm: FormGroup;
    workers: Worker[];
    customers: Customer[];
    page = 1;
    details: {
        workerId: number,
        orderNumber: number,
        cargo: string,
        vehicle: number,
        customerId: number,
        loadingPlace: string,
        unloadingPlace: string,
    };


    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private ordersServices: OrdersService,
                private navParams: NavParams,
                private workersService: WorkersService,
                private customersService: CustomersService) {
    }

    ngOnInit() {
        if (this.hasData() == false) {
            this.addOrderForm();
        } else {
            this.editOrderForm();
        }
        this.getWorkers();
        this.getCustomers();

    }

    hasData() {
        this.details = {
            workerId: this.navParams.get('workerId'),
            orderNumber: this.navParams.get('orderNumber'),
            cargo: this.navParams.get('cargo'),
            vehicle: this.navParams.get('vehicle'),
            customerId: this.navParams.get('customerId'),
            loadingPlace: this.navParams.get('loadingPlace'),
            unloadingPlace: this.navParams.get('unloadingPlace'),
        };
        if ((this.details.workerId || this.details.orderNumber || this.details.cargo || this.details.vehicle || this.details.customerId || this.details.loadingPlace || this.details.unloadingPlace) === undefined) {
            return false
        } else return true;
    }

    addOrderForm() {
        this.ordersForm = this.formBuilder.group({
            workerId: [``, Validators.required],
            orderNumber: [``, Validators.required],
            cargo: [``, Validators.required],
            vehicle: [``, Validators.required],
            customerId: [``, Validators.required],
            loadingPlace: [``, Validators.required],
            unloadingPlace: [``, Validators.required]
        });
    }

    editOrderForm() {
        this.ordersForm = this.formBuilder.group({
            workerId: [`${this.details.workerId}`, Validators.required],
            orderNumber: [`${this.details.workerId}`, Validators.required],
            cargo: [`${this.details.workerId}`, Validators.required],
            vehicle: [`${this.details.workerId}`, Validators.required],
            customerId: [`${this.details.workerId}`, Validators.required],
            loadingPlace: [`${this.details.workerId}`, Validators.required],
            unloadingPlace: [`${this.details.workerId}`, Validators.required]
        });
    }

    onSubmit() {
        if (this.ordersForm.invalid) {

        } else {
            console.log(this.ordersForm.value);
            if (this.hasData() == true) {
                this.ordersServices
                    .editOrder(this.navParams.get('id'), this.ordersForm.value)
                    .subscribe();
                return this.modalController.dismiss({'dissmised': true})
            }

            this.ordersServices
                .addOrder(this.ordersForm.value)
                .subscribe();
            return this.modalController.dismiss({'dissmised': true})
        }
    }

    closeModal() {
        this.modalController.dismiss();
    }

    getWorkers() {
        this.workersService.getWorkers(this.page)
            .subscribe(result => this.workers = result);
    }

    getCustomers() {
        this.customersService.getCustomers(this.page)
            .subscribe(result => this.customers = result);
    }
}
