import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() public checkControl: FormControl;
  @Output() public onChange: EventEmitter<ChangeValue> = new EventEmitter<ChangeValue>();

  public labelState: string;
  public alternativeIcon: string = 'https://static.thenounproject.com/png/252447-200.png';

  constructor(private switchService: SwitchService, public themeService: ThemeService, private eventService: EventService) { }

  ngOnInit(): void {
    //
    this.labelState = this.device.state ? StateEnum.onText : StateEnum.offText;
    //
    this.checkControl.setValue(this.device.state, { emitEvent: false });
    //
    this.switchService.isNewState.subscribe(res => {
      if (res.deviceid === this.device.deviceid) {
        //
        if (res.params?.switch) {
          //
          this.checkControl.setValue(res.params.switch === StateEnum.on, { emitEvent: false });
          //
          this.labelState = res.params.switch === StateEnum.on ? StateEnum.onText : StateEnum.offText

          return;
        }
        //
        if (res.params?.switches) {
          this.setDeviceChannels(res)
          return;
        }
        //
        if (!this.device.isMultipleChannelDevice && !res.error) {
          //

          this.checkControl.setValue(!this.device.state, { emitEvent: false });
          //
          this.labelState = !this.device.state ? StateEnum.onText : StateEnum.offText;
          //
          this.device.switch = !this.device.state ? StateEnum.on : StateEnum.off;
          this.device.state = !this.device.state;

          // const device_p_data = {
          //   deviceid: res.deviceid,
          //   switch: this.device.state ? StateEnum.on : StateEnum.off,
          //   state: this.device.state
          // }
          // console.log('emitido  LISTEN_STATE_CHANNEL', device_p_data)
          // this.eventService.emit('LISTEN_STATE_CHANNEL', device_p_data)
          return;
        }
        console.log(this.device.isMultipleChannelDevice && !res.error)
        if (this.device.isMultipleChannelDevice && !res.error) {

          this.device.loading = true;
          // this.switchService.getDevice
          this.switchService.getDevice(this.device.deviceid).subscribe(async res => {
            //
            const device_data = res.data;
            //
            this.setDeviceChannels(device_data)            
          }, err => {
            console.log(err)
          });
          this.device.loading = false;
          return;
        }


        //
        //  this.checkControl.setValue(res.params, { emitEvent: false });
        // this.labelState = res.newValue ? StateEnum.onText : StateEnum.offText;
      }
    });

  }

  /**
   * 
   * @param device 
   */
  changeManully(device) {
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

}
