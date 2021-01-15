import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SwitchComponent } from "./switch/switch.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakPointRegistry, FlexFillStyleBuilder, FlexLayoutModule, FlexOrderStyleBuilder, FlexStyleBuilder, LayoutAlignStyleBuilder, LayoutGapStyleBuilder, LayoutStyleBuilder, MediaMarshaller, PrintHook, ShowHideStyleBuilder, StylesheetMap, StyleUtils, ɵMatchMedia } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { NotifierModule } from "angular-notifier";
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './device/device.component';
import { CommonModule } from "@angular/common";
import { MaterialDefinitionsModule } from "./material-definitions/material-definitions.module";
import { MenuInfoComponent } from './menu-info/menu-info.component';
import { JsonPrettyDialogComponent } from './json-pretty-dialog/json-pretty-dialog.component';
import { NgxJsonViewerModule } from "ngx-json-viewer";

@NgModule({
  declarations: [
    AppComponent,
    SwitchComponent,
    LoginComponent,
    HomeComponent,
    DeviceComponent,
    MenuInfoComponent,
    JsonPrettyDialogComponent,
  ],
  entryComponents: [JsonPrettyDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialDefinitionsModule,
    NgxJsonViewerModule,
    NotifierModule.withConfig({
      position: { vertical: { position: 'top', distance: 74 }, horizontal: { position: "right" } }
    })
  ],
  providers: [
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder,
    FlexFillStyleBuilder,
    LayoutGapStyleBuilder,
    LayoutAlignStyleBuilder
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
