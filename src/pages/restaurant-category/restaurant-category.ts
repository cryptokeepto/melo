import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantPage } from "../restaurant/restaurant";
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { RestaurantCategory } from "../../models/restaurant_category";

@IonicPage()
@Component({
  selector: 'page-restaurant-category',
  templateUrl: 'restaurant-category.html',
})
export class RestaurantCategoryPage {
  
  restaurantCategory: RestaurantCategory[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantProvider: RestaurantProvider) {}

  public getRestaurantCategory(): void {
    this.restaurantProvider.getRestaurantCategory().subscribe(
      (res) => {
        this.restaurantCategory = res;
      }, 
      (err) => {
        console.log(err)
      },
      () => {
        console.log("getRestaurantCategory success!");
      }
    );
  }

  private doRefresh(refresh): void {
    this.restaurantProvider.getRestaurantCategory().subscribe(
      (res) => {
        this.restaurantCategory = res;
      }, 
      (err) => {
        refresh.complete();
        console.log(err)
      },
      () => {
        refresh.complete();
        console.log("getRestaurantCategory success!");
      }
    );
  }

  public goRestaurant(rc): void {
    this.navCtrl.push(RestaurantPage, rc);
  }


  private getItem(ev: any): void {
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.restaurantCategory = this.restaurantCategory.filter(
        (restaurantCategory: RestaurantCategory) => {
          return restaurantCategory.name_restaurant_category.indexOf(val) > -1
      });
    } else {
      this.getRestaurantCategory();
    }
  }

  ionViewWillEnter() {
    this.getRestaurantCategory();
  }

}
