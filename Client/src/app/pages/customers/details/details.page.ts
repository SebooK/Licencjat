import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../services/Loading/loading.service";
import {CustomersService} from "../../../services/Customers/customers.service";
import {Customer} from "../../../models/customer.model";
import {AddPage} from "../add/add.page";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    private details: Customer;

    constructor(private http: HttpClient,
                private alertController: AlertController,
                private customersService: CustomersService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private loading: LoadingService) {
    }

    ngOnInit() {
        console.log(this.activatedRoute.snapshot.data['customerDetails']);
        this.details = this.activatedRoute.snapshot.data['customerDetails'];
    }

    displayCustomer() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.customersService.getCustomer(id).subscribe(result => {
            this.details = result;
            console.log(this.details);
            this.loading.dismiss();
        }, error => {
            console.log(error);
            this.loading.dismiss();
        });
    }


    async editCustomer() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: this.details

        });
        modal.onDidDismiss().then(res => this.displayCustomer());
        return await modal.present();
    }

}
