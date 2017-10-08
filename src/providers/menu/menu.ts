import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Menu } from "../../models/menu";
import { MenuDetail } from "../../models/menu_detail";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class MenuProvider {

  url: string = "http://sittikiat.streetfood.in.th:3000/api";

  constructor(public http: Http) {}

  public getMenu(): Observable<Menu[]> {
    return this.http.get(`${this.url}/menu`)
    .map((res: Response) => <Menu[]> res.json())
    .catch(this.handleError);
  }

  public getMenuDetail(id: number): Observable<MenuDetail[]> {
    return this.http.get(`${this.url}/menu/${id}`)
    .map((res: Response) => <Menu[]> res.json())
    .catch(this.handleError);
  }

  private handleError(err: any) {
    return Observable.throw(err.json() || "เกิดข้อผิดพลาดจาก server");
  }

}
