import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import MenuLink from '../models/menu_link';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.scss']
})
export class MenuInfoComponent {

  public menuLinks: MenuLink[] = environment.menuLinks;

  constructor() { }

  redirectComments(menulink: MenuLink) {
    window.open(menulink.link);
  }

}
