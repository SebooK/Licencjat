import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";
import {Worker} from "../../models/worker.model";

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
    private me: Worker;

    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private navParams: NavParams,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.getData();
        console.log(this.me);
    }

    getData() {
        this.me = this.navParams.get('user')
    }

    close() {
        this.modalController.dismiss();
    }
}
