import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Storage} from "@ionic/storage";
import {ToastController} from "@ionic/angular";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkersService} from "../../services/workers.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private authService:AuthService,
              private storage:Storage,
              private toastController: ToastController,
              private route:Router,
              private workersService:WorkersService,
              private activatedRoute: ActivatedRoute) { }
  private user: any;
  ngOnInit() {
    // Do poprawy nie odświeza się zawsze
    let id = this.authService.user.id;
    console.log(id);
    this.workersService.getWorker(id).subscribe(result => {
      this.user = result;
    })
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


}
