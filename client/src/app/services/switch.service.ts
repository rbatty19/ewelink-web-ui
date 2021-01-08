import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class SwitchService {
  constructor(private http: HttpClient) {}

  getDevices() {
    return this.http.get(`${environment.urlBase}/devices`).toPromise();
  }

  getDevice(deviceid: string) {
    return this.http
      .post<any>(`${environment.urlBase}/device`, { deviceid })
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
