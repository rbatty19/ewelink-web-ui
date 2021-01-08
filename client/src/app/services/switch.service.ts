import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Data } from "../models/data";

@Injectable({
  providedIn: "root"
})
export class SwitchService {
  constructor(private http: HttpClient) {}

  getDevices(user: Data) {
    return this.http.post(`${environment.urlBase}/devices`, { region: user.region, at: user.at }).toPromise();
  }

  getDevice(deviceid: string, user: Data) {
    return this.http
      .post<any>(`${environment.urlBase}/device`, { deviceid: deviceid, region: user.region, at: user.at })
      .toPromise();
  }

  getCredentials() {
    return this.http.get(`${environment.urlBase}/ewecredentials`).toPromise();
  }

  setDeviceStatus(state: any, deviceid: string) {
    return this.http
      .post<any>(`${environment.urlBase}/setstatus?state=${state}`, { deviceid })
      .toPromise();
  }

  toggleDevice(deviceid: string) {
    return this.http
      .post<any>(`${environment.urlBase}/toggle`, { deviceid })
      .toPromise();
  }
}

export type stateDevice = "on" | "off";
