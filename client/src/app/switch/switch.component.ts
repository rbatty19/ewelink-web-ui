import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
import {  SocketService } from '../services/socket.service';
import { Data, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Device } from '../models/device';
import { StateEnum } from '../models/state_enum';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  host: {
    class: 'width'
  }
})
export class SwitchComponent implements OnInit {
  public devices: Device[] = [];
  public authData: Data | any;

  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  constructor(public switchService: SwitchService, private router: Router, private notifier: NotifierService, private socketService: SocketService) {
    this.authData = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit() {
    this.notifier.show({
      message: "Loading",
      type: "warining",
      template: this.customNotificationTmpl,
      id: 'loading'
    });
  }

  async ngAfterViewInit() {
    this.getAllDevices();
  }

  //this method is for changing the device state from button
  async changeState(id: string, valueChange: boolean) {
    try {

      let newState = valueChange ? StateEnum.on : StateEnum.off;

      this.socketService.sendMessageWebSocket(this.authData, id, newState);

      this.switchService.isNewState.next({ deviceid: id, newValue: valueChange });

    } catch (error) {
      this.notifier.show({
        message: `Error ${error}`,
        type: "warining",
        id: 'loading'
      });
      this.router.navigate(['/login']);
    }
  }

  // this method get all devices data
  getAllDevices() {
    this.switchService.getDevices(this.authData).subscribe(res => {
      this.devices = res.data;
      this.socketService.openWebSocket(this.authData);
      this.notifier.hide('loading');
    }, err => {
      this.router.navigate(['/login']);
    });
  }

  // this method change a device state by id
  async setStatus(status: boolean, deviceid: string) {
    try {
      await this.switchService.setDeviceStatus(status ? 'on' : 'off', deviceid).toPromise();
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  // this method toggle state device by id
  async toggleDevie(deviceid: string) {
    try {
      await this.switchService.toggleDevice(deviceid).toPromise();
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

}
