import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavParams} from "@ionic/angular";
import {CustomersService} from "../../../services/Customers/customers.service";

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    customerForm: FormGroup;
    details: {
      companyName: string;
      companyPhone: string;
      companyAddress: string;
    };
    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private customersService: CustomersService,
                private navParams: NavParams) {
    }

    ngOnInit() {
      if (this.hasData() == false) {
        this.addCustomerForm();
      } else {
        this.editCustomerForm();
      }
    }

    hasData() {
        this.details = {
            companyName: this.navParams.get('companyName'),
            companyAddress: this.navParams.get('companyAddress'),
            companyPhone: this.navParams.get('companyPhone'),
        };
        if ((this.details.companyName || this.details.companyAddress || this.details.companyPhone) === undefined) {
            return false
        } else return true;
    }

    addCustomerForm() {
        this.customerForm = this.formBuilder.group({
          companyName: [``, Validators.required],
          companyAddress: [``, Validators.required],
          companyPhone: [``, Validators.required]
        });
    }

    editCustomerForm() {
        this.customerForm = this.formBuilder.group({
          companyName: [`${this.details.companyName}`, Validators.required],
          companyAddress: [`${this.details.companyAddress}`, Validators.required],
          companyPhone: [`${this.details.companyPhone}`, Validators.required]
        });
    }

    onSubmit() {
        if (this.customerForm.invalid) {

        } else {
            console.log(this.customerForm.value);
            if (this.hasData() == true) {
                this.customersService
                    .editCustomer(this.navParams.get('id'), this.customerForm.value)
                    .subscribe();
                return this.modalController.dismiss({'dissmised': true})
            }

            this.customersService
                .addCustomer(this.customerForm.value)
                .subscribe();
            return this.modalController.dismiss({'dissmised': true})
        }
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
