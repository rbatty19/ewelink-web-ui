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
  /**
   * Open a socket connection to eWeLink
   * and execute callback function with server message as argument
   *
   * @param callback
   * @param heartbeat
   * @returns {Promise<WebSocketAsPromised>}
   */
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
