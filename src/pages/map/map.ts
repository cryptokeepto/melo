import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, CameraPosition, Marker, MarkerOptions } from "@ionic-native/google-maps";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;
  mapElement: HTMLElement;
  lat: number;
  lng: number;
  feedback: string;
  name: string;
  rate: number;
  image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private googleMaps: GoogleMaps) {
    this.name = this.navParams.get("name");
    this.rate = this.navParams.get("rate");
    this.image = this.navParams.get("image");
    this.lat = this.navParams.get("lat");
    this.lng = this.navParams.get("lng");

    this.platform.ready().then(() => {
      this.showMap();
    }).catch((err) => {
      if (err) throw err
    })
  }

  private ionViewWillEnter(): void {
    this.showMap();
  }

  private ionViewWillLeave(): void {
    this.map.clear();
  }

  private showMap(): void {
    let option: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 17
      }
    }
    this.mapElement = document.getElementById("map");
    this.map = this.googleMaps.create(this.mapElement, option);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let markerOption: MarkerOptions = {
        title: this.name,
        icon: "red",
        animation: "DROP",
        position: {
          lat: this.lat,
          lng: this.lng
        }
      }
      this.map.addMarker(markerOption);
    })
  }

  private getLocation(): void {
    this.map.getMyLocation().then((location) => {
      let position: CameraPosition<any> = {
        target: location.latLng,
        zoom: 10
      }
      this.map.moveCamera(position);
      let option: MarkerOptions = {
        position: location.latLng,
        title: "I' m Here",
        animation: "BOUNCE"
      }
      this.map.addMarker(option).then((marker: Marker) => {
        marker.showInfoWindow();
      })
    })
  }

  


}




