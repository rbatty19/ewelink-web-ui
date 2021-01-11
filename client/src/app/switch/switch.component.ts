import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
// import { SocketService } from '../services/socket.service';
import { Data, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Device } from '../models/device';
import { StateEnum } from '../models/ewelink_enums';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  openWebSocketMixin,
  ChangeState
} from "../services/socket.service";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  host: { class: 'width' }
})
export class SwitchComponent implements OnInit {

  public devices: Device[] = [];
  public authData: Data | any;
  public devicesGroup: FormGroup;
  public wsp: any = "";

  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  constructor(public switchService: SwitchService, private router: Router, private notifier: NotifierService,
    private fb: FormBuilder) {
    this.authData = JSON.parse(localStorage.getItem('data'));
    this.devicesGroup = this.fb.group({
      checkControls: this.fb.array([])
    });
  }

  ngOnInit() {
    this.switchService.initSubject();
    // this.getAllDevices();
    this.notifier.show({
      message: "Loading",
      type: "warining",
      template: this.customNotificationTmpl,
      id: 'loading'
    });
  }

  async ngAfterViewInit() {
    this.getAllDevices();

    this.wsp = await openWebSocketMixin.openWebSocket(
      (res: any) => {
        if (typeof res !== 'string') {
          if (res.params) {
            this.devices.map(data => {
              if (data.deviceid == res.deviceid)
                Object.assign(data, {
                  state: res.params.switch,
                  request: false
                });
            });
          }
        }
      },
      { at: this.authData.at, apiKey: this.authData.user.apikey, region: this.authData.region }
    );
  }

  //this method is for changing the device state from button
  async changeState2(id: string, valueChange: boolean) {
    // try {

    //   let newState = valueChange ? StateEnum.on : StateEnum.off;

    //   this.socketService.sendMessageWebSocket(this.authData, id, newState);

    //   this.switchService.isNewState.next({ deviceid: id, newValue: valueChange });

    // } catch (error) {
    //   console.log(error);
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    // }
  }

  //this method is for changing the device state from button
  async changeState(item: any) {
    try {
      console.log(item)
      item.request = true;

      let newState = item.newValue ? "on" : "off";

      let actionParams = {
        at: this.authData.at,
        apiKey: this.authData.user.apikey,
        deviceId: item.deviceid,
        params: { switch: newState },
        // state: newState
      };

      const pay = ChangeState.set(actionParams);

      await this.wsp.send(pay);

      // double check
      // const { data }: any = await this.switchService.getDevice(item.deviceid, this.authData);
      // item.state = data.state;

      item.request = false;
    } catch (error) {
      console.log(error)
      item.request = false;
      // localStorage.clear();
      // this.router.navigate(['/login']);
    }
  }

  // this method get all devices data
  getAllDevices() {
    this.switchService.getDevices(this.authData).subscribe(res => {
      this.devices = res.data;
      res.data.forEach(item => {
        this.devicesControl.push(new FormControl(item.state === StateEnum.on));
      });
      // this.socketService.openWebSocket(this.authData);
      this.notifier.hide('loading');
    }, err => {
      this.notifier.hide('loading');
      console.log(err);
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  get devicesControl(): FormArray {
    return this.devicesGroup.get('checkControls') as FormArray
  }

}
