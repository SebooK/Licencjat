import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AlertController} from "@ionic/angular";
import {WorkersService} from "../../services/workers.service";
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  vehicleForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private workersService: WorkersService, private alertController:AlertController) { }

  ngOnInit() {

    this.vehicleForm = this.formBuilder.group({
      username:['',[Validators.required]] ,
      password:['',[Validators.required]] ,
      firstname:['',[Validators.required]] ,
      lastname:['',[Validators.required]] ,
      role:['',[Validators.required]],
      email:['',[Validators.required]] ,
    })
  }
  onSubmit() {
    this.workersService.addWorker(this.vehicleForm.value).subscribe();
  }
}
