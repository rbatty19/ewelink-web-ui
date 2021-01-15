import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
import { Data, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Device } from '../models/device';
import { StateEnum } from '../models/ewelink_enums';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { EventService, EventType } from '../services/event.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  host: { class: 'width' }
})
export class SwitchComponent implements OnInit {

  public devices: Device[] = [];
  public devicesGroup: FormGroup;

  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  constructor(public switchService: SwitchService, private router: Router, private notifier: NotifierService,
    private fb: FormBuilder, private socketService: SocketService, private eventService: EventService) {
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
    this.listenEvents();
  }

  listenEvents() {
    this.eventService.listen().subscribe(res => {
      switch (res.type as EventType) {
        case 'LISTEN_STATE_CHANNEL':
          // console.log('recibido LISTEN_STATE_CHANNEL', res)
          this.devices = this.devices.map(device_item => {
            if (device_item.deviceid === res.data.deviceid) {
              // this.devices.push(device_item)
              // Object.assign(device_item, {
              //   ...res.data
              // })
            }
            return device_item;
          })
          // console.log(this.devices)
          break;
      }
    });
  }

  //this method is for changing the device state from button
  async changeState({ deviceid, params }) {
    try {

      console.log(this.switchService.getAuth())

      // let newState = newValue ? StateEnum.on : StateEnum.off;   
      this.socketService.sendMessageWebSocket({       
        deviceid,
        params
      });

      // DO NOT CHANGE UNTIL CONFIRMATION
      // this.switchService.isNewState.next({ deviceid: deviceid, params });

    } catch (error) {
      console.log('changeState', error)
    }
  }

  // this method get all devices data
  getAllDevices() {
    this.switchService.getDevices().subscribe(async res => {
      this.devices = res.data;
      this.devicesControl.patchValue(Array.from(res.data, (v, k) => this.devicesControl.push(new FormControl(false))));
      await this.socketService.openWebSocket();
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
