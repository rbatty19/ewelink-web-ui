import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket3.service';
import { SwitchService } from '../services/switch.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  

  constructor(private router: Router,  private switchService: SwitchService, private socketService: SocketService, public themeService: ThemeService) { }

  ngOnInit() {
  }


  LogOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.switchService.isNewState.unsubscribe();
    this.socketService.socket?.complete();
  }

}
