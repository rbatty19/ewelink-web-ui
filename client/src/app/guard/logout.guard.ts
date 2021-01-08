import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(public router: Router){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const isLogin: boolean = !localStorage.getItem('data');
    if(!isLogin) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
