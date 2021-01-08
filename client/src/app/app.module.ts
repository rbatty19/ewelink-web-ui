import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SwitchComponent } from "./switch/switch.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakPointRegistry, FlexFillStyleBuilder, FlexLayoutModule, FlexOrderStyleBuilder, FlexStyleBuilder, LayoutAlignStyleBuilder, LayoutGapStyleBuilder, LayoutStyleBuilder, MediaMarshaller, PrintHook, ShowHideStyleBuilder, StylesheetMap, StyleUtils, ɵMatchMedia } from "@angular/flex-layout";
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NotifierModule } from "angular-notifier";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, SwitchComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NotifierModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
