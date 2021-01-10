export interface DeviceInfo {
  online:         boolean;
  deviceid:       string;
  name:           string;
  type:           string;
  params:         DeviceInfoParams;
  brandName:      string;
  showBrand:      boolean;
  brandLogoUrl:   string;
  productModel:   string;
}

export interface DeviceInfoParams {
  version:     number;
  sledOnline:  string;
  switch:      string;
  fwVersion:   string;
  rssi:        number;
  staMac:      string;
  startup:     string;
  init:        number;
  pulse:       string;
  pulseWidth:  number;
  ssid:        string;
  bssid:       string;
  at:          string;
  apiKey:      string;
  deviceId:    string;
  params:      Params;
}


export interface Params {
  switch: string;
}


