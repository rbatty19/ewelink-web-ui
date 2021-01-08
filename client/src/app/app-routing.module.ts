import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginGuard } from './guard/login.guard';
import { LogoutGuard } from './guard/logout.guard';
import { LoginComponent } from './login/login.component';
import {SwitchComponent} from './switch/switch.component'


const routes: Routes = [
  { path: 'switch', component: SwitchComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', component: LoginComponent, canActivate: [LogoutGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
