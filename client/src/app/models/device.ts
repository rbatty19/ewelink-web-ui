import { DeviceInfo } from "./deviceInfo";
import { StateEnum } from "./ewelink_enums";

export interface Device {
  status:   string;
  state:    StateEnum;
  name:     string;
  deviceid: string;
  request:  boolean;
  deviceInfo: DeviceInfo;
}
