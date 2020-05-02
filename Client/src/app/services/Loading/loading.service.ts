import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(public loadingController: LoadingController) {
    }

    async present() {

        let loading: HTMLIonLoadingElement;

        return await this.loadingController.create({
            message:'Please wait..',
            spinner:"bubbles",
        }).then( res => {
            loading = res;
            loading.present()
        });
    }

    async dismiss() {

      return await this.loadingController.dismiss().then( () => console.log('dismissed'));
    }
}

