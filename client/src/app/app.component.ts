import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `switch_device`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/iluminacion.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `on_device`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/on.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `off_device`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/off.svg')
    );
  }

}
