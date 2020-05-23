import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {

    this.credentialsForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe( res => console.log(res));

  }


}
