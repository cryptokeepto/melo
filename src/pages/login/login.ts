import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Events } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { SignupPage } from "../signup/signup";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private events: Events,
    private authProvider: AuthProvider,
    private formBuilder: FormBuilder) {

    this.email = this.formBuilder.control(null, Validators.required);
    this.password = this.formBuilder.control(null, Validators.compose([Validators.required, Validators.minLength(6)]));

    this.loginForm = this.formBuilder.group({
      "email": this.email,
      "password": this.password
    });
  }


  private goSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private login(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    let loading = this.loadingCtrl.create({
      content: "Plase wait..."
    });
    loading.present();

    this.authProvider.login(email, password).subscribe(
      (res) => {
        let feedback: boolean = res;
        if (feedback == true) {
          console.log("Login success");
          // getProfile
          this.authProvider.getProfile().subscribe(
            (res) => {
              let profile = res;
              this.events.publish("user:login", profile); // ส่งข้อมูลทันที Events ไปให้ app.component
            },
            (err) => {
              let alert = this.alertCtrl.create({
                title: "Opps !",
                subTitle: err,
                buttons: ["ok"]
              });
              alert.present();
              loading.dismiss();
            },
            () => {
              console.log("getProfile success");
              loading.dismiss();
            }
          )
        } else {
          console.log("Login fail");
        }
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: "Opps !",
          subTitle: err,
          buttons: ["ok"]
        });
        alert.present();
        loading.dismiss();
      },
      () => {
        console.log("Welcome success");
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }
    )

  }

  private ionViewDidLoad(): void {
    // disable menu
    this.menuCtrl.enable(false);
  }


}
