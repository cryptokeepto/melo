import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { RestaurantImage } from "../../models/restaurant_image";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ShowimagePage } from "../showimage/showimage";
import { MapPage } from "../map/map";
import { Comment } from "../../models/comment";

@IonicPage()
@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {

  idRestaurantDetail: number;
  nameRestaurantDetail: string;
  commentRestaurantDetail: any;
  rateRestaurantDetail: number;
  addressRestaurantDetail: any;
  imgRestaurantDetail: any;
  idRestaurantCategoryDetail: number;
  nameRestaurantCategoryDetail: string;
  imagesRestaurantDetail: RestaurantImage[];
  lat: number;
  lng: number;
  commentRes: Comment[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restaurantProvider: RestaurantProvider,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing) {

    this.idRestaurantDetail = this.navParams.get("id_restaurant");
    this.nameRestaurantDetail = this.navParams.get("name_restaurant");
    this.commentRestaurantDetail = this.navParams.get("comment_restaurant");
    this.rateRestaurantDetail = this.navParams.get("rate_restaurant");
    this.addressRestaurantDetail = this.navParams.get("address_restaurant");
    this.imgRestaurantDetail = this.navParams.get("img_restaurant");
    this.lat = this.navParams.get("lat");
    this.lng = this.navParams.get("lng");
    this.idRestaurantCategoryDetail = this.navParams.get("id_restaurant_category");
    this.nameRestaurantCategoryDetail = this.navParams.get("name_restaurant_category");
  }

  public getRestaurantImage(): void {
    this.restaurantProvider.getRestaurantImage(this.idRestaurantDetail).subscribe(
      (res) => {
        this.imagesRestaurantDetail = res;
      },
      (err) => console.log(err),
      () => console.log("getRestaurantImage success!")
    );
  }

  private takeCamera(): void {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      correctOrientation: true,
      quality: 50,
      saveToPhotoAlbum: false,
      sourceType: 1,
      encodingType: this.camera.EncodingType.JPEG
    }

    this.camera.getPicture(options).then((value) => {
      let imageData = "data:image/jpeg;base64," + value;
      let modal = this.modalCtrl.create(ShowimagePage, { "data": imageData, "id_restaurant": this.idRestaurantDetail });
      modal.present();
    }).catch(() => {
      console.log("error");
    })
  }

  private openAlbum(): void {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      correctOrientation: true,
      quality: 50,
      saveToPhotoAlbum: false,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 0
    }

    this.camera.getPicture(options).then((value) => {
      let imageData = "data:image/jpeg;base64," + value;
      let modal = this.modalCtrl.create(ShowimagePage, { "data": imageData, "id_restaurant": this.idRestaurantDetail });
      modal.present();
    }).catch(() => {
      console.log("error");
    })
  }

  private doRefresh(refresh): void {
    this.restaurantProvider.getRestaurantImage(this.idRestaurantDetail).subscribe(
      (res) => {
        this.imagesRestaurantDetail = res;
      },
      (err) => {
        console.log(err)
        refresh.complete();
      },
      () => {
        console.log("getRestaurantImage success!");
        refresh.complete();
      }
    );
  }

  private share(): void {
    this.socialSharing.share(this.commentRestaurantDetail, this.nameRestaurantDetail, null, "http://streetfood.in.th/")
      .then(() => {
        console.log("share sucess");
      })
      .catch(() => {
        console.log("share fail");
      });
  }

  private goMap(): void {
    this.navCtrl.push(MapPage, {
      "name": this.nameRestaurantDetail,
      "rate": this.rateRestaurantDetail,
      "image": this.imagesRestaurantDetail,
      "lat": this.lat,
      "lng": this.lng
    })
  }


  private getComment() {
    this.restaurantProvider.getRestaurantComment(this.idRestaurantDetail).subscribe((res) => {
      this.commentRes = res;
    })
  }

  private postComment(comment): void {

    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    })
    loading.present();

    this.restaurantProvider.postRestaurantComment(comment, this.idRestaurantDetail).subscribe(
      (res) => {
        if (res.status == "success") {
          let alert = this.alertCtrl.create({
            title: res.message,
            subTitle: "Comment เรียบร้อย",
            buttons: ["ok"]
          });
          alert.present();
          loading.dismiss();
        } else {
          let alert = this.alertCtrl.create({
            title: "Opps !",
            subTitle: res.message,
            buttons: ["ok"]
          });
          alert.present();
          loading.dismiss();
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      },
      () => {
        console.log("Comment Restaurant Success");
        loading.dismiss();
      },
    )
  }


  private ionViewWillEnter() {
    this.getRestaurantImage();
    this.getComment();
  }


}
