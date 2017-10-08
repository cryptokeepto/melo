import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
import { MenuDetail } from "../../models/menu_detail";
import { RestaurantDetailPage } from "../restaurant-detail/restaurant-detail";


@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage {

  idMenu: number;
  nameMenu: String;
  menuDetail: MenuDetail[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuProvider: MenuProvider, private loadingCtrl: LoadingController) {
    this.idMenu = this.navParams.get("id_menu");
    this.nameMenu = this.navParams.get("name_menu");
  }

  private getMenuDetail() {
    let loading = this.loadingCtrl.create({
      content: "Plase wait..."
    });
    loading.present();
    this.menuProvider.getMenuDetail(this.idMenu).subscribe(
      (res) => {
        this.menuDetail = res;
      },
      (err) => {
        loading.dismiss();
        console.log(err);
      },
      () => {
        loading.dismiss();
        console.log("getMenuDetail success!");
      }
    );
  }

  private doRefresh(refresh): void {
    this.menuProvider.getMenuDetail(this.idMenu).subscribe(
      (res) => {
        this.menuDetail = res;
      },
      (err) => {
        console.log(err)
        refresh.complete();
      },
      () => {
        console.log("getMenuDetail success!");
        refresh.complete();
      }
    );
  }

  private goDetail(md) {
    this.navCtrl.push(RestaurantDetailPage, md);
  }

  private ionViewWillEnter(): void {
    this.getMenuDetail();
  }


}
