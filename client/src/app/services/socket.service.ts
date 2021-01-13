import * as websocket from "websocket";
import WSAP from "websocket-as-promised";
import { DataLogin } from "../models/data_login";
import { environment } from "src/environments/environment";
import { StateEnum } from "../models/ewelink_enums";
import { wssLoginPayload, wssUpdatePayload } from "../models/wssPayload";
import { Injectable } from "@angular/core";
import { SwitchService } from "./switch.service";

@Injectable({
  providedIn: "root"
})
export class SocketService {

  private W3CWebSocket = websocket.w3cwebsocket;
  private WebSocket: WSAP;

  constructor(private switchService: SwitchService) {

  }

  /**
 * Open a socket connection to eWeLink
 * and execute callback function with server message as argument
 *
 * @param callback
 * @param heartbeat
 */
  async openWebSocket(user: DataLogin) {

    const payloadLogin = wssLoginPayload(user);

    this.WebSocket = new WSAP(environment.urlWebSocket(user.region), {
      createWebSocket: wss => new this.W3CWebSocket(wss)
    });

    this.WebSocket.onMessage.addListener(message => {
      try {
        const data = JSON.parse(message);
        if (data.params) {
          this.switchService.isNewState.next({ deviceid: data.deviceid, newValue: data.params.switch === StateEnum.on });
        }
      } catch (error) {
        console.log(error);
      }
    });

    await this.WebSocket.open();
    this.WebSocket.send(payloadLogin);

    setInterval(async () => {
      this.WebSocket.send("ping");
    }, 120000);

  }

  sendMessageWebSocket(user: DataLogin, deviceId: string, newState: StateEnum) {
    const params = {
      at: user.at,
      apiKey: user.user.apikey,
      deviceId: deviceId,
      params: { switch: newState },
    }
    const payload = wssUpdatePayload(user, params, deviceId);

    this.WebSocket.send(payload);

  }

}
