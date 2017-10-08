import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";


@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  text: any;
  format: any;
  cancelled: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner :BarcodeScanner) {
  }

  private scan(): void {
    this.barcodeScanner.scan()
    .then((value) => {
      this.text = value.text;
      this.format = value.format;
      this.cancelled = value.cancelled;
    })
    .catch(() => {
      console.log("scan fail");
    })
  }
}
