import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, CameraPosition, Marker, MarkerOptions, GoogleMapsEvent, Circle, CircleOptions } from "@ionic-native/google-maps";
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { Restaurant } from "../../models/restaurant";
import { RestaurantDetailPage } from "../restaurant-detail/restaurant-detail";

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: GoogleMap;
  restaurantMap: Restaurant[];
  latlng: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
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
    this.initMap();
    this.markerRestaurant();
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
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.markerRestaurant();
      console.log("Marker success");
    })
  }

  private markerRestaurant(): void {
    this.restaurantMap.forEach((value) => {
      let markerOption: MarkerOptions = {
        position: {
          lat: value.lat,
          lng: value.lng
        },
        icon: "red",
        title: value.name_restaurant,
        snippet: "Star: " + value.rate_restaurant
      }
      this.map.addMarker(markerOption).then((marker: Marker) => {
        marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
          this.navCtrl.setRoot(RestaurantDetailPage, value)
        })
      })
    })
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
          animation: "BOUNCE",
          icon: "BLUE"
        }
        this.map.addMarker(option).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      });
    });

  }


}
