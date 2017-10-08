import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantCategoryPage } from './restaurant-category';

@NgModule({
  declarations: [
    RestaurantCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantCategoryPage),
  ],
})
export class RestaurantCategoryPageModule {}
