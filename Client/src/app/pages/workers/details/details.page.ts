import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {tap, catchError} from "rxjs/operators";
import {WorkersService} from "../../../services/workers.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AddPage} from "../add/add.page";
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  url = environment.url;
  constructor(private platform: Platform,
              private http: HttpClient,
              private alertController: AlertController,
              private workersService: WorkersService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private modalController: ModalController) { }
  private details: any;
  ngOnInit() {
    this.displayUserDetails();

  }

  displayUserDetails(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.workersService.getWorker(id).subscribe(result => {
      this.details = result;
    });
  }

  async editWorkerModal(){
   const modal = await  this.modalController.create({
      component:AddPage,
      componentProps: {
        id:this.details.id,
        username:this.details.username,
        password:this.details.password,
        email:this.details.email,
        firstname:this.details.firstname,
        lastname:this.details.lastname,
        role:this.details.role
      }
    });
   modal.onDidDismiss().then(res =>this.displayUserDetails());
   return await modal.present();
  }

}

