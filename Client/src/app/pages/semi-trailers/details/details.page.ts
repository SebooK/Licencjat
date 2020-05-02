import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../services/Loading/loading.service";
import {SemiTrailerService} from "../../../services/semiTrailers/semi-trailer.service";
import {SemiTrailer} from "../../../models/semiTrailers.model";
import {AddPage} from "../../semi-trailers/add/add.page";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private details: SemiTrailer;

  constructor(private http: HttpClient,
              private alertController: AlertController,
              private semiTrailerService: SemiTrailerService ,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalController: ModalController,
              private loading: LoadingService) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data['semiTrailerDetails']);
    this.details = this.activatedRoute.snapshot.data['semiTrailerDetails'];
  }

  displaySemiTrailer() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.semiTrailerService.getSemiTrailer(id).subscribe(result => {
      this.details = result;
      console.log(this.details);
      this.loading.dismiss();
    }, error => {
      console.log(error);
      this.loading.dismiss();
    });
  }


  async editSemiTrailer() {
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps: this.details

    });
    modal.onDidDismiss().then(res => this.displaySemiTrailer());
    return await modal.present();
  }

}
