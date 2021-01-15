import nonce from "nonce"
import { DataLogin } from "src/app/models/data_login";

export const wssLoginPayload = (user: DataLogin) => {
  const timeStamp: any = new Date().getTime() / 1000;
  const ts = Math.floor(timeStamp);
  const sequence = Math.floor(timeStamp * 1000);
  const payload = {
    action: "userOnline",
    userAgent: "app",
    version: 8,
    nonce: `${nonce()}`,
    at: user.at,
    apikey: user.user.apikey,
    ts: `${ts}`,
    sequence
  };
  return JSON.stringify(payload);
};

export const wssUpdatePayload = ({ apikey, params, deviceid }) => {
  const timeStamp = (new Date()).getTime() / 1000;
  const sequence = Math.floor(timeStamp * 1000);
  const payload = {
    action: 'update',
    deviceid,
    apikey,
    selfApikey: apikey,
    params,
    sequence,
    userAgent: 'app',
  };
  return JSON.stringify(payload);
};
