import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/Auth/auth.service";
import {Storage} from "@ionic/storage";
import {ModalController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkersService} from "../../services/Workers/workers.service";
import {Worker} from "../../models/worker.model"
import {MePage} from "../me/me.page";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


    constructor(private authService: AuthService,
                private storage: Storage,
                private toastController: ToastController,
                private route: Router,
                private workersService: WorkersService,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController) {
    }

    private user: Worker;

    ngOnInit() {
        this.user = this.activatedRoute.snapshot.data['user'];

    }

    logout() {
        this.authService.logout();
    }

    workersPage() {
        return this.route.navigate(['workers']);
    }

    ordersPage() {
        return this.route.navigate(['orders']);
    }

    vehiclePage() {
        return this.route.navigate(['vehicles']);
    }

    semiTrailerPage() {
        return this.route.navigate(['semi-trailers']);
    }

    customersPage() {
      return this.route.navigate(['customers']);
    }

    async aboutMe() {
        const modal = await this.modalController.create({
            component: MePage,
            componentProps: {
                user: this.user
            }
        });
        return await modal.present();
    }
}
