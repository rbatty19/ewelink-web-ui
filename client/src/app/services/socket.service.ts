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
      console.log(message)
      try {
        //
        const data = JSON.parse(message);
        //
        if (data.params) {
          //
          console.log(data)
          //
          if (data?.params?.switch || data?.params?.switches)
            this.switchService.isNewState.next({
              deviceid: data.deviceid,
              params: data.params
            });
        } else
          if (data.deviceid && !data.error) {
            //
            this.switchService.isNewState.next({
              deviceid: data.deviceid,
              error: Boolean(data?.error)
            });
          }
      } catch (error) {
        if (message !== 'pong') console.log({ error, message });
      }
    });

    await this.WebSocket.open();
    this.WebSocket.send(payloadLogin);

    setInterval(async () => {
      this.WebSocket.send("ping");
    }, 120000);

  }

  sendMessageWebSocket({ apikey, deviceid, params }: any) {
    //
    const payload = wssUpdatePayload({ apikey, params, deviceid });
    //
    console.log(payload)
    //
    this.WebSocket.send(payload);
  }

}


/*



import * as websocket from "websocket";
import WebSocket from 'ws'
import WSAP from "websocket-as-promised";
import { wssLoginPayload } from "./lib/wssLoginPayload";
import { wssUpdatePayload } from "./lib/wssUpdatePayload";
// import delay from "delay";
// import ts from "typescript";


const W3CWebSocket = websocket.w3cwebsocket;
const WebSocketAsPromised = WSAP;

const apiUrl = (region = "us") =>
  `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`;


export const openWebSocketMixin = {

  async openWebSocket(callback, { at, apiKey, region }) {
    const payloadLogin = wssLoginPayload({
      at: at,
      apiKey: apiKey
    });

    const wsp = new WebSocketAsPromised(apiUrl(region), {
      createWebSocket: wss => new W3CWebSocket(wss)
    });

    wsp.onMessage.addListener(message => {
      try {
        const data = JSON.parse(message);
        callback(data);
      } catch (error) {
        callback(message);
      }
    });

    await wsp.open();
    await wsp.send(payloadLogin);

    setInterval(async () => {
      await wsp.send("ping");
    }, 120000);

    return wsp;
  }
};


//@ts-ignore
export class ChangeState extends WebSocket {
  static set({ at, apiKey, deviceId, params }) {
    // const payloadLogin = wssLoginPayload({ at, apiKey });

    const payloadUpdate = wssUpdatePayload({
      apiKey,
      deviceId,
      params
    });

    return payloadUpdate;
  }
}



 */