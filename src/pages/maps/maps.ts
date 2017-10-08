import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions } from "@ionic-native/google-maps";

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
    this.showMap();
  }

  private showMap(): void {
    let mapElement = document.getElementById("map");
    let option: GoogleMapOptions = {
      camera: {
        target: {
          lat: "",
          lng: "" // TODO
        },
        zoom: 10
      }
    }
    this.map = this.googleMaps.create(mapElement, option);
  }


}
