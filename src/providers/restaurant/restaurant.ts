import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Restaurant } from "../../models/restaurant";
import { Feedback } from "../../models/feedback";
import { RestaurantCategory } from "../../models/restaurant_category";
import { RestaurantImage } from "../../models/restaurant_image";
import { Comment } from "../../models/comment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';



@Injectable()
export class RestaurantProvider {

  url: string = "http://sittikiat.streetfood.in.th:3000/api";

  constructor(public http: Http) {}

  public getRestaurantAll() {
    return this.http.get(`${this.url}/restaurant`)
    .map((res: Response) => <Restaurant[]> res.json())
    .catch(this.handleError);
  }

  public getRestaurantComment(id: number) {
    return this.http.get(`${this.url}/restaurant/comment/${id}`)
    .map((res: Response) => <Comment[]> res.json())
    .catch(this.handleError);
  }

  public postRestaurantComment(comment: string, id: number) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({headers: headers});
    let body = {
      "comment": comment,
      "id": id
    }
    return this.http.post(`${this.url}/restaurant/comment/new`, body, options)
    .map((res: Response) => <Feedback> res.json())
    .catch(this.handleError);
  }

  public getRestaurant(id: number) {
    return this.http.get(`${this.url}/restaurant/${id}`)
    .map((res: Response) => <Restaurant[]> res.json())
    .catch(this.handleError);
  }

  public getRestaurantCategory() {
    return this.http.get(`${this.url}/restaurant_category`)
    .map((res: Response) => <RestaurantCategory[]> res.json())
    .catch(this.handleError);
  }

  public getRestaurantImage(id: number) {
    return this.http.get(`${this.url}/restaurant_image/${id}`)
    .map((res: Response) => <RestaurantImage[]> res.json())
    .catch(this.handleError);
  }

  public postRestaurantImage(imageData, id) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({headers: headers});
    let body = {
      "imageData": imageData,
      "id": id
    }
    return this.http.post(`${this.url}/newrestaurant_image`, body, options)
    .map((res: Response) => <Feedback> res.json())
    .catch(this.handleError);
  }

  private handleError(err: any) {
    return Observable.throw(err.json() || "เกิดข้อผิดพลาดจาก server");
  }


}
