import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import ChangeValue from '../models/change_value';
import { Device } from '../models/device';
import { StateEnum } from '../models/ewelink_enums';
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

  constructor(private switchService: SwitchService, public themeService: ThemeService) { }

  ngOnInit(): void {

    //
    this.labelState = this.device.state ? StateEnum.onText : StateEnum.offText;
    //
    this.checkControl.setValue(this.device.state === StateEnum.on, { emitEvent: false });
    //
    this.checkControl.valueChanges.subscribe(res => {
      this.onChange.emit({ deviceid: this.device.deviceid, newValue: res });
    });
    //
    this.switchService.isNewState.subscribe(res => {
      if (res.deviceid === this.device.deviceid) {
        this.checkControl.setValue(res.newValue, { emitEvent: false });
        this.labelState = res.newValue ? StateEnum.onText : StateEnum.offText;
      }
    });

  }

  changeManully() {
    this.onChange.emit({ deviceid: this.device.deviceid, newValue: !this.checkControl.value });
  }

}
