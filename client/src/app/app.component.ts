import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private themeService: ThemeService) {

    this.themeService.initTheme();

    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/github.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'preview',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/preview.svg')
    );

  }

}
