import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from "../login/login";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              private authProvider: AuthProvider) {

    this.email = this.formBuilder.control("", [Validators.required, SignupPage.emailValidator]);
    this.password = this.formBuilder.control("", Validators.compose([Validators.required, Validators.minLength(6)]));

    // assign ให้กับ form
    this.myForm = this.formBuilder.group({
      'email': this.email,
      'password': this.password
    });

  }

  //ตรวจสอบความถูกต้องของอีเมล์โดยใช้ Regular Expression
  static emailValidator(control: FormControl) {
    let email_regxp: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_regxp.test(control.value) ? null : { invalidEmail: true };
  }

  private signup(): void {
    let email = this.myForm.value.email;
    let password = this.myForm.value.password;
    this.postSignUp(email, password);
  }

  private postSignUp(email: string, password: string): void {
    let loading = this.loadingCtrl.create({
      content: "Plase wait..."
    });
    loading.present();

    this.authProvider.signUp(email, password).subscribe(
      (res) => {
        let feedback: boolean = res;
        if (feedback == true) {
          console.log("Signup Success");
        } else {
          console.log("Signup Fail");
        }
      },
      (err) => {
        let errMessage = err;
        let alert = this.alertCtrl.create({
          title: "Opps !",
          subTitle: errMessage,
          buttons: ["ok"]
        });
        alert.present();
        loading.dismiss();
      },
      () => {
        this.navCtrl.setRoot(LoginPage);
        loading.dismiss();
        console.log("insert success");
      }
    );
  }

}
