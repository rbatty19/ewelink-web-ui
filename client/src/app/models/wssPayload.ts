import nonce from "nonce"
import { Data } from "src/app/models/data";

export const wssLoginPayload = (user: Data) => {
  const timeStamp: any = new Date().getTime() / 1000;
  const ts = Math.floor(timeStamp);
  const sequence = Math.floor(timeStamp * 1000);
  const payload = {
    action: "userOnline",
    userAgent: "app",
    version: 6,
    nonce: `${nonce()}`,
    at: user.at,
    apikey: user.user.apikey,
    appid: user.user.appId,
    ts: `${ts}`,
    sequence
  };
  return payload;
};

export const wssUpdatePayload = (user: Data, params: any, deviceId: string) => {
  const timeStamp = (new Date()).getTime() / 1000;
  const sequence = Math.floor(timeStamp * 1000);
  const payload = {
    action: 'update',
    deviceid: `${deviceId}`,
    apikey: user.user.apikey,
    userAgent: "app",
    params,
    sequence,
  };
  return payload;
};
