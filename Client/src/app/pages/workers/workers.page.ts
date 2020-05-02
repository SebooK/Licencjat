import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {ModalController, AlertController, ToastController} from "@ionic/angular";

import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {WorkersService} from "../../services/Workers/workers.service";
import {AddPage} from "./add/add.page";
import {Worker} from "../../models/worker.model"
import {LoadingService} from "../../services/Loading/loading.service";
import {filter, map} from "rxjs/operators";


@Component({
    selector: 'app-workers',
    templateUrl: './workers.page.html',
    styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {

    url = environment.url;
    workers: Worker[];
    page = 1;

    constructor(private platform: Platform,
                private http: HttpClient,
                private alertController: AlertController,
                private modalController: ModalController,
                private router: Router,
                private workersService: WorkersService,
                private toastController: ToastController,
                private loading: LoadingService) {

    }

    ngOnInit() {
        this.displayWorkers(event);
    }

    displayWorkers(event?) {
        this.workersService
            .getWorkers(this.page)
           
            .subscribe(result => {
                this.workers = result;
                if (event) {
                    event.target.complete();
                }
            });
    }

    displayMore(event) {
        console.log(event);+
        this.page++;
        this.displayWorkers();

        if (this.page === this.workers['pages']) {
            event.target.disabled = true;
        }
    }

    async addWorkerModal() {
        const modal = await this.modalController.create({
            component: AddPage
        });
        modal.onDidDismiss().then(res => this.displayWorkers());
        return await modal.present();
    }

    async deleteWorker(id) {
        console.log(id);
        const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Are you sure to delete this user?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.workersService.deleteWorker(id).subscribe();
                        return this.alertController.dismiss();
                    }
                }]
        });

        await alert.present();
    }
}
