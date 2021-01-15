import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DataLogin } from "../models/data_login";
import { catchError } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { Device } from "../models/device";
import { ResponseData } from "../models/response";
import ChangeValue from "../models/change_value";

@Injectable({
  providedIn: "root"
})
export class SwitchService {

  public isNewState: Subject<ChangeValue> = new Subject<ChangeValue>();

  constructor(private http: HttpClient) { }

  initSubject() {
    this.isNewState = new Subject<ChangeValue>();
  }

  getDevices() {
    const userData = this.getAuth();
    return this.http.post<ResponseData<Device[]>>(`${environment.urlBase}/devices`, { region: userData.region, at: userData.at })
      .pipe(catchError(this.errorHandle));
  }

  getDevice(deviceid: string) {
    const userData = this.getAuth();
    return this.http
      .post<ResponseData<Device>>(`${environment.urlBase}/device`, { deviceid: deviceid, region: userData.region, at: userData.at })
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

  getAuth(): DataLogin {
    return JSON.parse(localStorage.getItem('data'));
  }

  private errorHandle(res) {
    // localStorage.clear();
    return throwError(res);
  }
}
