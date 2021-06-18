import { Component, OnInit, ViewChild } from '@angular/core';
import { SwitchService, } from '../services/switch.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  public devicesRaw: any[] = [];
  public devicesGroup: FormGroup;

  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  constructor(
    public switchService: SwitchService,
    private router: Router,
    private notifier: NotifierService,
    private fb: FormBuilder,
    private socketService: SocketService,
    private eventService: EventService,
    public activeRoute: ActivatedRoute,
  ) {
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
    // this.listenEvents();
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
        case 'SET_STATE_EVENT':
          this.changeState(res.data)
          break;
      }
    });
  }

  //this method is for changing the device state from button
  async changeState({ deviceid, params }) {
    try {
      console.log('changeState ', { deviceid, params })
      //      
      this.socketService.sendMessageWebSocket({
        deviceid,
        params
      });

    } catch (error) {
      console.log('changeState', error)
    }
  }

  // this method get all devices data
  async getAllDevices() {

    const self = this;

    this.switchService.getDevices().subscribe(async (res: any) => {

      this.devices = res.data;
      if (!res?.data?.length) {
        this.devicesRaw = res.devicesRaw;
      }

      this.devicesControl.patchValue(Array.from(res.data, (v, k) => this.devicesControl.push(new FormControl(false))));
      await this.socketService.openWebSocket();
      this.notifier.hide('loading');


    }, err => {
      this.notifier.hide('loading');
      console.log(err);
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    test()

    function test() {
      self.activeRoute.queryParams.subscribe((res: any) => {
        /**
         * deviceid
         * state         
         */
        const { deviceid, state } = res;

        if (deviceid && state) {
          console.log('LIST', self.devices)

          setTimeout(() => {
            self.changeState({
              deviceid,
              params:
              {
                switch: state
              }
            })
          }, 3000);

        }

      }, err => {
        // this.notifierService.notify('error', 'Unauthorized');
        // this.isLoading = false;
        console.log('BAD LIST')
      })

    }


  }

  get devicesControl(): FormArray {
    return this.devicesGroup.get('checkControls') as FormArray
  }

}
