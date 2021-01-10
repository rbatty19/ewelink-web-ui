import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
import { SocketService } from '../services/socket.service';
import { Data, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Device } from '../models/device';
import { StateEnum } from '../models/state_enum';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    private socketService: SocketService, private fb: FormBuilder) {
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
  async changeState(id: string, valueChange: boolean) {
    try {

      let newState = valueChange ? StateEnum.on : StateEnum.off;

      this.socketService.sendMessageWebSocket(this.authData, id, newState);

      this.switchService.isNewState.next({ deviceid: id, newValue: valueChange });

    } catch (error) {
      this.notifier.show({
        message: `Error ${error}`,
        type: "error"
      });
      this.router.navigate(['/login']);
    }
  }

  // this method get all devices data
  getAllDevices() {
    this.switchService.getDevices(this.authData).subscribe(res => {
      this.devices = res.data;
      res.data.forEach(item => {
        this.devicesControl.push(new FormControl(item.state === StateEnum.on));
      });
      this.socketService.openWebSocket(this.authData);
      this.notifier.hide('loading');
    }, err => {
      this.notifier.hide('loading');
      this.notifier.show({
        message: `Error ${err}`,
        type: "error"
      });
      this.router.navigate(['/login']);
    });
  }

  get devicesControl(): FormArray {
    return this.devicesGroup.get('checkControls') as FormArray
  }

}
