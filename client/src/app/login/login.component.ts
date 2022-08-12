import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ThemeEnum } from '../models/ewelink_enums';
import { queryDataToSetState } from '../models/setStateWithURL';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;
  public themeEnum = ThemeEnum;

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(public notifierService: NotifierService, public authService: AuthService, public router: Router, public activeRoute: ActivatedRoute, public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.test();
  }

  test() {
    this.activeRoute.queryParams.subscribe((res: queryDataToSetState) => {

      /**
       * deviceid
       * state
       * email
       * password
       */
      const { email, password, deviceid, state } = res;
    

      if (email && password && deviceid && state) {
        this.authService.loginAuth({ email, password }).subscribe(async res => {
          this.router.navigate(['/home'], {
            queryParams: {
              deviceid,
              state
            }
          });
          // this.eventService.emit('SET_STATE_EVENT', { deviceid, params: { newstate: state } })
        }, err => {
          // this.notifierService.notify('error', 'Unauthorized');
          // this.isLoading = false;
        })
        console.log('response', { res })
      }
    })
  }

  LoginApp() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.authService.loginAuth(this.formLogin.value).subscribe(res => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      }, err => {
        this.notifierService.notify('error', 'Something Wrong');
        this.isLoading = false;
      })
    } else {
      this.notifierService.notify('error', 'Is not valid input');
    }
  }

}
