import { StateEnum } from "./state_enum";

export interface Device {
  status:   string;
  state:    StateEnum;
  name:     string;
  deviceid: string;
  request:  boolean;
}
