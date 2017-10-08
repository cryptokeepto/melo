import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class AuthProvider {


  constructor(public http: Http) { }

  public signUp(email: string, password: string): Observable<boolean> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      "client_id": "zF5bs5fhcl2W1wzYcxgAVTEG2aXXZAyt",
      "email": email,
      "password": password,
      "connection": "Username-Password-Authentication"
    }
    return this.http.post("https://miikeoho.auth0.com/dbconnections/signup", body, options)
    .map((res: Response) => {
      let feedback = res.json();
      if (feedback) {
        return true;
      } else {
        return false;
      }
    })
    .catch(this.handleErrorSignup);
  }

  public login(email: string, password: string): Observable<boolean> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({headers: headers});
    let body = {
      "client_id": "zF5bs5fhcl2W1wzYcxgAVTEG2aXXZAyt",
      "username": email,
      "password": password,
      "connection": "Username-Password-Authentication",
      "scope": "openid",
      "grant_type": "password"
    }
    return this.http.post("https://miikeoho.auth0.com/oauth/token", body, options)
    .map((res: Response) => {
      let token = res.json();
      localStorage.setItem("token",token.id_token);
      if (token) {
        return true;
      } else {
        return false;
      }

    })
    .catch(this.handleErrorLogin);

  }

  public getProfile(): Observable<Object> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({headers: headers});
    let token = localStorage.getItem("token");
    let body = {
      "id_token": token
    }

    return this.http.post("https://miikeoho.auth0.com/tokeninfo", body, options)
    .map((res: Response) => {
      let profile = <Object> res.json();
      if (profile) {
        localStorage.setItem("profile", JSON.stringify(profile));
        return profile;
      } else {
        console.log("error getProfile");
      }
    })
    .catch(this.handleErrorGetProfile);
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }


  private handleErrorSignup(err: any) {
    return Observable.throw(err.json().description || "เกิดข้อผิดพลาดจาก server");
  }

  private handleErrorLogin(err: any) {
    return Observable.throw(err.json().error_description || "เกิดข้อผิดพลาดจาก server");
  }

  private handleErrorGetProfile(err: any) {
    return Observable.throw(err.json().error_description || "เกิดข้อผิดพลาดจาก server");
  }
}
