import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { JsonPrettyDialogComponent } from '../json-pretty-dialog/json-pretty-dialog.component';
import ChangeValue from '../models/change_value';
import { Device } from '../models/device';
import { StateEnum } from '../models/ewelink_enums';
import { EventService } from '../services/event.service';
import { SwitchService } from '../services/switch.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() public device: Device | any;
  @Input() public errorFromDevices: boolean;
  @Input() public checkControl: FormControl;
  @Output() public onChange: EventEmitter<ChangeValue> = new EventEmitter<ChangeValue>();

  public labelState: string;
  public alternativeIcon: string = environment.alternativeIcon;

  public loading: boolean;

  constructor(private switchService: SwitchService, public themeService: ThemeService, private eventService: EventService, private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!("state" in this.device)) return;
    //
    this.labelState = this.device.state ? StateEnum.onText : StateEnum.offText;
    //
    this.checkControl.setValue(this.device.state, { emitEvent: false });
    //
    this.switchService.isNewState.subscribe(res => {
      if (res.deviceid === this.device.deviceid) {

        if (res.params?.switch) {
          this.initLoading();
          //
          this.checkControl.setValue(res.params.switch === StateEnum.on, { emitEvent: false });
          //
          this.labelState = res.params.switch === StateEnum.on ? StateEnum.onText : StateEnum.offText

          this.stopLoading();
          return;
        }
        //
        if (res.params?.switches) {
          this.setDeviceChannels(res)
          return;
        }
        //
        if (!this.device.isMultipleChannelDevice && !res.error) {
          this.initLoading();
          //
          this.checkControl.setValue(!this.device.state, { emitEvent: false });
          //
          this.labelState = !this.device.state ? StateEnum.onText : StateEnum.offText;
          //
          this.device.switch = !this.device.state ? StateEnum.on : StateEnum.off;
          this.device.state = !this.device.state;
      
          this.stopLoading();
          return;
        }
        if (this.device.isMultipleChannelDevice && !res.error) {
          this.initLoading();
          //
          this.switchService.getDevice(this.device.deviceid).subscribe(async res => {
            //
            const device_data = res.data;
            //
            this.setDeviceChannels(device_data)
          }, err => {
            console.log(err)
          });
          this.stopLoading();
          return;
        }

      }
      this.stopLoading();
    });

  }

  /**
   *
   * @param device
   */
  changeManully(device) {
    this.initLoading();
    //
    const new_state = {
      switch: !device.state ? StateEnum.on : StateEnum.off
    }
    //
    this.onChange.emit({
      //
      deviceid: this.device.deviceid,
      params: {
        ...new_state
      }
    });

  }

  /**
   *
   * @param item
   * @param device
   */
  changeChannelManully(item: any, device: any) {
    this.initLoading();
    //
    const new_channel_state = {
      switch: !item.state ? StateEnum.on : StateEnum.off,
      outlet: item.channel
    }

    let switches = device.deviceInfo.params.switches

    switches[item.channel] = new_channel_state

    this.onChange.emit(
      {
        deviceid: item.parentDeviceId,
        params: {
          switches: switches
        }
      }
    );
  }


  setDeviceChannels(device_data) {
    this.device = {
      ...this.device,
      deviceChannels: this.device.deviceChannels.map((d_channel) => {

        const d_c_switch = device_data.params.switches[d_channel.channel].switch
        d_channel.state = d_c_switch === StateEnum.on;
        d_channel.switch = d_c_switch;

        return d_channel;
      })
    }
  }

  initLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  openJSONDialog() {
   
    return this.dialog.open(JsonPrettyDialogComponent, {
      autoFocus: false,
      data: this.device,
      hasBackdrop: true,
      maxHeight: '90%',
      panelClass: ['animate__animated', 'animate__zoomIn', 'dialog-responsive']
    });
  }

}
