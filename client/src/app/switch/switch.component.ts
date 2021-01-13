import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
import { Data, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Device } from '../models/device';
import { StateEnum } from '../models/ewelink_enums';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../services/socket.service';

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

  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  constructor(public switchService: SwitchService, private router: Router, private notifier: NotifierService,
    private fb: FormBuilder, private socketService: SocketService) {
    this.authData = JSON.parse(localStorage.getItem('data'));
    this.devicesGroup = this.fb.group({
      checkControls: this.fb.array([])
    });
  }

  ngOnInit() {
    this.switchService.initSubject();
    this.getAllDevices();
    this.notifier.show({
      message: "Loading",
      type: "warining",
      template: this.customNotificationTmpl,
      id: 'loading'
    });
  }

  //this method is for changing the device state from button
  async changeState({ deviceid, newValue }) {
    try {

      let newState = newValue ? StateEnum.on : StateEnum.off;

      this.socketService.sendMessageWebSocket(this.authData, deviceid, newState);

      this.switchService.isNewState.next({ deviceid: deviceid, newValue: newValue });

    } catch (error) {

    }
  }

  // this method get all devices data
  getAllDevices() {
    this.switchService.getDevices(this.authData).subscribe(async res => {
      this.devices = res.data;
      this.devicesControl.patchValue(Array.from(res.data, (v, k) => this.devicesControl.push(new FormControl(false))));
      await this.socketService.openWebSocket(this.authData);
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
