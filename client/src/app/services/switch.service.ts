import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Data } from "../models/data";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SwitchService {

  constructor(private http: HttpClient) {}

  getDevices(user: Data) {
    return this.http.post(`${environment.urlBase}/devices`, { region: user.region, at: user.at })
    .pipe(catchError(this.errorHandle));
  }

  getDevice(deviceid: string, user: Data) {
    return this.http
      .post<any>(`${environment.urlBase}/device`, { deviceid: deviceid, region: user.region, at: user.at })
      .pipe(catchError(this.errorHandle));
  }

  getCredentials() {
    return this.http.get(`${environment.urlBase}/ewecredentials`)
    .pipe(catchError(this.errorHandle));
  }

  setDeviceStatus(state: any, deviceid: string) {
    return this.http
      .post<any>(`${environment.urlBase}/setstatus?state=${state}`, { deviceid })
      .pipe(catchError(this.errorHandle));
  }

  toggleDevice(deviceid: string) {
    return this.http
      .post<any>(`${environment.urlBase}/toggle`, { deviceid })
      .pipe(catchError(this.errorHandle));
  }

  private errorHandle(res) {
    localStorage.clear();
    return throwError(res);
  }
}

export type stateDevice = "on" | "off";
