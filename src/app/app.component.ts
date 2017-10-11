import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { QrcodePage } from "../pages/qrcode/qrcode";
import { AuthProvider } from "../providers/auth/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // private rootPage: any;
  private rootPage: any = TabsPage;
  public pages: Array<{title: string, component: any}>;
  public profile: Object;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              private events: Events,
              private authProvider: AuthProvider) {
    this.initializeApp();
    this.listenToLogin();

    this.pages = [
      { title: 'Home', component: TabsPage }
    ];

  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // let token = localStorage.getItem("token");
      // if (token) {
      //   this.rootPage = TabsPage;
      //   let profile = localStorage.getItem("profile");
      //   if (profile) {
      //     this.profile = JSON.parse(profile);
      //   }
      // } else {
      //   this.rootPage = LoginPage;
      // }

    });
  }

  public openPage(page): void {
    this.nav.setRoot(page.component);
  }

  private listenToLogin(): void {
    this.events.subscribe("user:login", (profile) => {
      this.profile = profile;
    })
  }

  private logout(): void {
    this.authProvider.logout();
    this.nav.setRoot(LoginPage);
  }
}
