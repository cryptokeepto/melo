import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { QrcodePage } from "../qrcode/qrcode";
import { MapsPage } from "../maps/maps";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home: any;
  qrcode: any;
  maps: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    // page
    this.home = HomePage;
    this.qrcode = QrcodePage;
    this.maps = MapsPage;

    // enable menu
    this.menuCtrl.enable(true);
  }

 

}
