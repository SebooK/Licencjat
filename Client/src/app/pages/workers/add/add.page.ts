import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {WorkersService} from "../../../services/workers.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  workersForm: FormGroup;
  Data: {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    role: number
  }

  constructor(private modalController:ModalController,
              private formBuilder:FormBuilder,
              private workersService:WorkersService,
              private navParams:NavParams,
              private toastController:ToastController) {

  }

  ngOnInit() {
    if(this.hasData() == false) {
      this.workersForm = this.formBuilder.group( {
        username: [``,[Validators.required,Validators.minLength(5)]],
        password: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]],
        email: ['',[Validators.required,Validators.email]],
        firstname: ['',Validators.required],
        lastname:['',Validators.required],
        role:['',Validators.required]
      })
    } else {
      this.workersForm = this.formBuilder.group( {
        username: [`${this.Data.username}`,[Validators.required,Validators.minLength(5)]],
        password: [`${this.Data.password}`,[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]],
        email: [`${this.Data.email}`,[Validators.required,Validators.email]],
        firstname: [`${this.Data.firstname}`,Validators.required],
        lastname:[`${this.Data.lastname}`,Validators.required],
        role:[`${this.Data.role}`,Validators.required]
      })
    }

  }
  hasData() {
    this.Data = {
      username: this.navParams.get('username'),
      password: this.navParams.get('password'),
      email: this.navParams.get('email'),
      firstname: this.navParams.get('firstname'),
      lastname: this.navParams.get('lastname'),
      role: this.navParams.get('role')
    }
    if((this.Data.username || this.Data.password || this.Data.email || this.Data.firstname || this.Data.lastname || this.Data.role) === undefined) {
      return false
    }
    else return true;
  }


  closeModal(){
   return this.modalController.dismiss();
  }

  onSubmit() {
    if(this.workersForm.invalid){
      
    }
    console.log(this.workersForm.value);
    if(this.hasData() == true){
      this.workersService.editWorker(this.navParams.get('id'),this.workersForm.value).subscribe()
      return this.modalController.dismiss();
    }
    else{
      this.workersService
          .addWorker(this.workersForm.value)
          .subscribe();
      return this.modalController.dismiss({'dissmissed': true})

    }

  }
}
