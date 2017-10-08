import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
import { Menu } from "../../models/menu";
import { MenuDetailPage } from "../menu-detail/menu-detail";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  menu: Menu[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuProvider: MenuProvider) { }

  private getMenu(): void {
    this.menuProvider.getMenu().subscribe(
      (res) => this.menu = res,
      (err) => {
        console.log(err);
      },
      () => {
        console.log("getMenu success!");
      }
    );
  }

  private doRefresh(refresh): void {
    this.menuProvider.getMenu().subscribe(
      (res) => this.menu = res,
      (err) => {
        refresh.complete();
      },
      () => {
        refresh.complete();
      }
    );
  }

  private goDetail(m): void {
    this.navCtrl.push(MenuDetailPage, m);
  }

  private getItem(ev: any): void {
    let val = ev.target.value;
    if (val && val.trim()) {
      this.menu = this.menu.filter((menu: Menu) => menu.name_menu.indexOf(val) > -1);
    } else {
      this.getMenu();
    }

  }

  private ionViewWillEnter(): void {
    this.getMenu();
  }


}
