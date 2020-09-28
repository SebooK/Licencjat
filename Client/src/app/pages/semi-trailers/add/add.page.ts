import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavParams} from "@ionic/angular";
import {SemiTrailerService} from "../../../services/semiTrailers/semi-trailer.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    semiTrailerForm: FormGroup;
    page = 1;
    details: {
      registrationNumber: string,
      semiTrailerType: string
    };

    semiType = ['Chłodnia','Wywrotka','Cysterna','Silos','Niskopoziomowa','Uniwersalna','Izoterma'];

  constructor(private modalController:ModalController,
              private formBuilder:FormBuilder,
              private semiTrailerService:SemiTrailerService,
              private navParams: NavParams) { }

  ngOnInit() {
    if (this.hasData() == false) {
      this.addSemiTrailerForm();
    } else {
      this.editSemiTrailerForm();
    }

  }
  hasData() {
      this.details = {
        registrationNumber: this.navParams.get('registrationNumber'),
        semiTrailerType: this.navParams.get('semiTrailerType'),
      };
      if((this.details.registrationNumber || this.details.semiTrailerType) === undefined) {
        return false
      } else return true;
  }

  addSemiTrailerForm() {
      this.semiTrailerForm = this.formBuilder.group({
        registrationNumber: [``,Validators.required],
        semiTrailerType: [``,Validators.required]
      });
  }

  editSemiTrailerForm() {
    this.semiTrailerForm = this.formBuilder.group({
      registrationNumber: [`${this.details.registrationNumber}`,Validators.required],
      semiTrailerType: [`${this.details.semiTrailerType}`,Validators.required]
    });
  }

  onSubmit() {
    if (this.semiTrailerForm.invalid) {

    } else {
      console.log(this.semiTrailerForm.value);
      if (this.hasData() == true) {
        this.semiTrailerService
            .editSemiTrailer(this.navParams.get('id'), this.semiTrailerForm.value)
            .subscribe();
        return this.modalController.dismiss({'dissmised': true})
      }

      this.semiTrailerService
          .addSemiTrailer(this.semiTrailerForm.value)
          .subscribe();
      return this.modalController.dismiss({'dissmised': true})
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
