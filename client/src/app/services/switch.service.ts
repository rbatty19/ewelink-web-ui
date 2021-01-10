import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Data } from "../models/data";
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

  constructor(private http: HttpClient) {}

  initSubject() {
    this.isNewState = new Subject<ChangeValue>();
  }

  getDevices(user: Data) {
    return this.http.post<ResponseData<Device[]>>(`${environment.urlBase}/devices`, { region: user.region, at: user.at })
    .pipe(catchError(this.errorHandle));
  }

  getDevice(deviceid: string, user: Data) {
    return this.http
      .post<ResponseData<Device>>(`${environment.urlBase}/device`, { deviceid: deviceid, region: user.region, at: user.at })
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
