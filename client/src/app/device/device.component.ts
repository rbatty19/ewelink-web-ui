import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import ChangeValue from '../models/change_value';
import { Device } from '../models/device';
import { StateEnum } from '../models/state_enum';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() public device: Device;
  @Output() public onChange: EventEmitter<ChangeValue> = new EventEmitter<ChangeValue>();

  public checkControl: FormControl = new FormControl(false);
  public labelState: string;
  public iconState: string;

  constructor(private switchService: SwitchService) { }

  ngOnInit(): void {
    this.labelState = this.device.state === StateEnum.on ? 'On' : 'Off';
    this.iconState = this.device.state === StateEnum.on ? 'on_device' : 'off_device';

    this.checkControl.setValue(this.device.state === StateEnum.on, { emitEvent: false });

    this.checkControl.valueChanges.subscribe(res => {
      this.onChange.emit({ deviceid: this.device.deviceid, newValue: res });
    });

    this.switchService.isNewState.subscribe(res => {
      if (res.deviceid === this.device.deviceid) {
        this.checkControl.setValue(res.newValue, { emitEvent: false });
        this.labelState = res.newValue ? 'On' : 'Off';
        this.iconState = res.newValue ? 'on_device' : 'off_device';
      }
    });
  }

}
