import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, CameraPosition, Marker, MarkerOptions, GoogleMapsEvent, Circle, CircleOptions } from "@ionic-native/google-maps";
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { Restaurant } from "../../models/restaurant";

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: GoogleMap;
  restaurantMap: Restaurant[];
  latlng: any;

  //---------------------
  name: string;
  lat: number;
  lng: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private restaurantProvider: RestaurantProvider,
    private platform: Platform) {

    this.platform.ready().then(() => {
      this.initMap();
      this.ionViewWillEnter();
    }).catch((err) => {
      if (err) throw err;
    });

  }

  private initMap(): void {
    this.restaurantProvider.getRestaurantAll().subscribe(
      (res) => {
        this.restaurantMap = res;
      },
      (err) => {
        if (err) throw err;
      },
      () => {
        console.log("getRestaurantAll success");
      }
    )
  }

  private ionViewWillEnter(): void {
    this.showMap();
  }

  private ionViewWillLeave(): void {
    this.map.clear();
  }

  private showMap(): void {

    let mapElement = document.getElementById("map");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 13.7751593,
          lng: 100.5094758
        },
        zoom: 10
      }
    }
    this.map = this.googleMaps.create(mapElement, mapOptions);
  }

  private getMyLocation(): void {
    this.map.getMyLocation().then((location) => {
      this.latlng = location.latLng;

      // move camera
      let position: CameraPosition<any> = {
        target: this.latlng,
        zoom: 15
      }
      this.map.animateCamera(position).then(() => {
        // add marker
        let option: MarkerOptions = {
          position: this.latlng,
          title: "I'm Here",
          animation: "DROP",
          icon: "red"
        }
        this.map.addMarker(option).then((marker: Marker) => {
          marker.showInfoWindow();
        });
        // circle
        let optionCircle: CircleOptions = {
          center: location.latLng,
          radius: 300,
          strokeWidth: 5
        }
        this.map.addCircle(optionCircle);
      });
    });

  }


}
