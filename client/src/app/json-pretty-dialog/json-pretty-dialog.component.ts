import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceInfo } from '../models/deviceInfo';
import { JSONEnum } from '../models/ewelink_enums';
import { ThemeService } from '../services/theme.service';

declare let prettyPrintJson: any;

@Component({
  selector: 'app-json-pretty-dialog',
  templateUrl: './json-pretty-dialog.component.html',
  styleUrls: ['./json-pretty-dialog.component.scss']
})
export class JsonPrettyDialogComponent implements OnInit {

  public colorClass = '';
  @ViewChild('jsonPretty', { static: true }) jsonPre: ElementRef;
  public isExpanded: boolean = false;
  public isJsonWithExpanded: boolean = true;
  public expandedText: string = JSONEnum.expanded;
  public expandedIcon: string = JSONEnum.expandedIcon;

  constructor(@Inject(MAT_DIALOG_DATA) public deviceInfo: DeviceInfo, public dialogRef: MatDialogRef<JsonPrettyDialogComponent>, public themeService: ThemeService) {
    if (this.themeService.isDarkMode) this.colorClass = 'darkJson';
  }

  ngOnInit(): void {
    this.jsonPre.nativeElement.innerHTML = prettyPrintJson.toHtml(this.deviceInfo, { linkUrls: true });
    this.jsonPre.nativeElement.classList.add('not-display');
    this.jsonPre.nativeElement.classList.add(this.colorClass);
  }

  close() {
    this.dialogRef.close();
  }

  changeExpanded() {
    this.isExpanded = !this.isExpanded;
    this.expandedText = this.isExpanded ? JSONEnum.collapse : JSONEnum.expanded;
    this.expandedIcon = this.isExpanded ? JSONEnum.collapseIcon : JSONEnum.expandedIcon;
  }

  changeView() {
    this.isJsonWithExpanded = !this.isJsonWithExpanded;
    if (this.isJsonWithExpanded) {
      this.jsonPre.nativeElement.classList.add('not-display');
    }else {
      this.jsonPre.nativeElement.classList.remove('not-display');
    }
  }

}
