import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { Restaurant } from "../../models/restaurant";
import { RestaurantDetailPage } from "../restaurant-detail/restaurant-detail";

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  idRestaurant: number;
  nameRestaurant: string;
  restaurant: Restaurant[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantProvider: RestaurantProvider, private loadingCtrl: LoadingController) {
   this.idRestaurant = this.navParams.get("id_restaurant_category");
   this.nameRestaurant  = this.navParams.get("name_restaurant_category");
  }

  public getRestaurant(): void {
    let loading = this.loadingCtrl.create({
      content: "Plase wait..."
    });
    loading.present();
    this.restaurantProvider.getRestaurant(this.idRestaurant).subscribe(
      (res) => {
        this.restaurant = res;
      },
      (err) => {
        loading.dismiss();
        console.log(err);
      },
      () => {
        loading.dismiss();
        console.log("getRestaurant success!");
      } 
    );
  }

  private doRefresh(refresh): void {
    this.restaurantProvider.getRestaurant(this.idRestaurant).subscribe(
      (res) => {
        this.restaurant = res;
      },
      (err) => {
        console.log(err)
        refresh.complete();
      },
      () => {
        console.log("getRestaurant success!");
        refresh.complete();
      }
    );
  }

  private goDetail(r) {
    this.navCtrl.push(RestaurantDetailPage, r);
  }

  private ionViewWillEnter(): void {
    this.getRestaurant();
  }



}
