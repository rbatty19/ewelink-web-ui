import { Injectable } from "@angular/core";

import { wssLoginPayload, wssUpdatePayload } from "../models/wssPayload";
import { SwitchService } from "./switch.service";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Data } from "../models/data";
import { StateEnum } from "../models/state_enum";
import { delay, retryWhen, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class SocketService {

  public socket: WebSocketSubject<any>;

  constructor(private switchService: SwitchService) {

  }

  public apiUrl = (region = "us") => `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`;


  openWebSocket(user: Data) {

    const payloadLogin = wssLoginPayload(user);

    this.socket = webSocket({
      url: this.apiUrl(user.region),
      openObserver: { next: () => this.socket.next(payloadLogin) },
    });

    this.socket
    .pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(val => console.log('Retry WS.', val)),
          delay(1000)
        )
      )
    )
    .subscribe(res => {
      console.log(res);
      if (res.params) {
        this.switchService.isNewState.next({ deviceid: res.deviceid, newValue: res.params.switch === StateEnum.on });
      }
    }, err => {

      console.log(err);
    });

  }

  sendMessageWebSocket(user: Data, deviceId: string, newState: StateEnum) {
    const params = {
      at: user.at,
      apiKey: user.user.apikey,
      deviceId: deviceId,
      params: { switch: newState },
    }
    const payload = wssUpdatePayload(user, params, deviceId);
    this.socket.next(payload);
  }

}
