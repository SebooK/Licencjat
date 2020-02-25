import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {UserService} from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  users: any = [];
  constructor(public nav: NavController, public userServices: UserService, public modalCtrl: ModalController) {

  }

  ngOnInit(): void {

  }

}
