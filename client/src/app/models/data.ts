export interface Data {
  at:     string;
  rt:     string;
  user:   User;
  region: string;
}

export interface User {
  clientInfo:      ClientInfo;
  _id:             string;
  email:           string;
  password:        string;
  appId:           string;
  countryCode:     string;
  accountInfo:     AccountInfo;
  apikey:          string;
  createdAt:       Date;
  extra:           Extra;
  isAccepEmailAd:  boolean;
  language:        string;
  lang:            string;
  currentFamilyId: string;
  appInfos:        AppInfo[];
  online:          boolean;
  onlineTime:      Date;
  ip:              string;
  location:        string;
  offlineTime:     Date;
}

export interface AccountInfo {
  level: number;
}

export interface AppInfo {
  os:         string;
  appVersion: string;
}

export interface ClientInfo {
  model:      string;
  os:         string;
  imei:       string;
  romVersion: string;
  appVersion: string;
}

export interface Extra {
  lastEmailAdAt: Date;
  ipCountry:     string;
}
