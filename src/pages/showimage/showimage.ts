import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { Feedback } from "../../models/feedback";


@IonicPage()
@Component({
  selector: 'page-showimage',
  templateUrl: 'showimage.html',
})
export class ShowimagePage {

  id_restaurant: number;
  imageData: string;
  feedback: Feedback;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController, 
              private restaurantProvider: RestaurantProvider) {
    this.imageData = this.navParams.get("data");
    this.id_restaurant = this.navParams.get("id_restaurant");
  }

  private upload(): void {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    })
    loading.present();
    this.restaurantProvider.postRestaurantImage(this.imageData, this.id_restaurant).subscribe(
      (res) => {
        this.feedback = res;
        if (this.feedback.status == "success") {
          let toast = this.toastCtrl.create({
            message: this.feedback.message,
            duration: 3000
          });
          toast.present();
          loading.dismiss();
        } else {
          let toast = this.toastCtrl.create({
            message: this.feedback.message,
            duration: 3000
          });
          toast.present();
          loading.dismiss();
        }
      },
      (err) => {
        if (err) throw err;
        loading.dismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }


}
