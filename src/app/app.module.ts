import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestaurantCategoryPage } from "../pages/restaurant-category/restaurant-category";
import { RestaurantPage } from "../pages/restaurant/restaurant";
import { RestaurantDetailPage } from "../pages/restaurant-detail/restaurant-detail";
import { MenuPage } from "../pages/menu/menu";
import { MenuDetailPage } from "../pages/menu-detail/menu-detail";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import { SignupPage } from "../pages/signup/signup";
import { MapPage } from "../pages/map/map";
import { MapsPage } from "../pages/maps/maps";
import { QrcodePage } from "../pages/qrcode/qrcode";
import { ShowimagePage } from "../pages/showimage/showimage";

import { MenuProvider } from '../providers/menu/menu';
import { AuthProvider } from '../providers/auth/auth';
import { RestaurantProvider } from '../providers/restaurant/restaurant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from "ionic-img-viewer";
import { IonicStorageModule } from "@ionic/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Camera } from "@ionic-native/camera";
import { GoogleMaps } from "@ionic-native/google-maps";
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantCategoryPage,
    RestaurantPage,
    RestaurantDetailPage,
    MenuPage,
    MenuDetailPage,
    LoginPage,
    TabsPage,
    SignupPage,
    MapPage,
    QrcodePage,
    ShowimagePage,
    MapsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestaurantCategoryPage,
    RestaurantPage,
    RestaurantDetailPage,
    MenuPage,
    MenuDetailPage,
    LoginPage,
    TabsPage,
    SignupPage,
    MapPage,
    QrcodePage,
    ShowimagePage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestaurantProvider,
    MenuProvider,
    AuthProvider,
    SocialSharing,
    BarcodeScanner,
    Camera,
    GoogleMaps,
    AuthProvider,
    MenuProvider,
    RestaurantProvider,
    AuthProvider,
    RestaurantProvider,
    MenuProvider
  ]
})
export class AppModule {}
