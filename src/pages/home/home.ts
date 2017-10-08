import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RestaurantCategoryPage } from "../restaurant-category/restaurant-category";
import { MenuPage } from "../menu/menu";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {}

  private goRestaurantCategory(): void {
    this.navCtrl.push(RestaurantCategoryPage);
  }

  private goMenu(): void {
    this.navCtrl.push(MenuPage);
  }

  private doRefresh(refresh): void {
    setTimeout(() => {
      refresh.complete();
    }, 1500);
  }



}
