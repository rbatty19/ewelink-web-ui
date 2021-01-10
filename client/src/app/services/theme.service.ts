import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeEnum } from '../models/ewelink_enums';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private currentTheme: ThemeEnum = ThemeEnum.light;

  get isDarkMode(): boolean {
    return this.currentTheme === ThemeEnum.dark;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.currentTheme = ThemeEnum[localStorage.getItem('activeTheme')] || ThemeEnum.dark;
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchMode() {
    this.currentTheme = this.isDarkMode ? ThemeEnum.light : ThemeEnum.dark;
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }
}
