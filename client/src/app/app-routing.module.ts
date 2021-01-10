import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginGuard } from './guard/login.guard';
import { LogoutGuard } from './guard/logout.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SwitchComponent } from './switch/switch.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'switch', component: SwitchComponent, canActivate: [LoginGuard] },
      { path: '', redirectTo: 'switch', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
