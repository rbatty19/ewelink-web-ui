import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class MaterialDefinitionsModule { }
