import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Customer} from "../../models/customer.model";
import {AlertController, ModalController, Platform, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/Loading/loading.service";
import {AddPage} from "../customers/add/add.page";
import {CustomersService} from "../../services/Customers/customers.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  url = environment.url;
  customers: Customer[];
  page = 1;

  constructor(private platform: Platform,
              private http: HttpClient,
              private alertController: AlertController,
              private modalController: ModalController,
              private router: Router,
              private customerService: CustomersService,
              private toastController: ToastController,
              private loading: LoadingService) {

  }

  ngOnInit() {
    this.displayCustomers(event);
  }

  displayCustomers(event?) {
    this.customerService
        .getCustomers(this.page)

        .subscribe(result => {
          this.customers = result;
          if (event) {
            event.target.complete();
          }
        });
  }

  displayMore(event) {
    console.log(event);+
        this.page++;
    this.displayCustomers();

    if (this.page === this.customers['pages']) {
      event.target.disabled = true;
    }
  }

  async addCustomerModal() {
    const modal = await this.modalController.create({
      component: AddPage
    });
    modal.onDidDismiss().then(res => this.displayCustomers());
    return await modal.present();
  }

  async deleteCustomer(id) {
    console.log(id);
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure to delete this customer?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.customerService.deleteCustomer(id).subscribe();
            return this.alertController.dismiss();
          }
        }]
    });
    alert.onDidDismiss().then(res => this.displayCustomers());

    await alert.present();
  }
}
