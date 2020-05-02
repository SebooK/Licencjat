import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ModalController} from "@ionic/angular";
import {AlertController} from "@ionic/angular";
import {SemiTrailer} from "../../models/semiTrailers.model";
import {LoadingService} from "../../services/Loading/loading.service";
import {SemiTrailerService} from "../../services/semiTrailers/semi-trailer.service";
import {AddPage} from "./add/add.page";

@Component({
    selector: 'app-semi-trailers',
    templateUrl: './semi-trailers.page.html',
    styleUrls: ['./semi-trailers.page.scss'],
})
export class SemiTrailersPage implements OnInit {
    url = environment.url;
    semiTrailers: SemiTrailer[];
    page = 1;

    constructor(private semiTrailerService: SemiTrailerService,
                private loadingController: LoadingService,
                private modalController: ModalController,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.displaySemiTrailers(event);
    }


    displaySemiTrailers(event?) {
        this.semiTrailerService
            .getSemiTrailers(this.page)
            .subscribe(result => {
                this.semiTrailers = result;
                console.log(this.semiTrailers)

                if (event) {
                    event.target.complete()
                }
            });
    }

    displayMore(event) {
        this.page++;
        this.displaySemiTrailers(event);

        if (this.page === this.semiTrailers['pages']) {
            event.target.disabled = true;
        }
    }

    async addSemiTrailer() {
        const modal = await this.modalController.create({
            component: AddPage,
        });
        modal.onDidDismiss().then(res => this.displaySemiTrailers(event));
        return await modal.present();
    }

    async deleteSemiTrailer(id) {
        const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Are you sure you want to delete this semiTrailer?',
            buttons: [{
                text: 'No',
                role: 'cancel'
            },{
                text: 'Yes',
                handler: () =>  {
                    this.semiTrailerService.deleteVehicle(id).subscribe();
                }
            }]
        });
        await alert.present();
    }
}
