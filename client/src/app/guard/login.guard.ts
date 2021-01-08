import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public router: Router){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const isHome: boolean = localStorage.getItem('data') !== null;
    if(!isHome) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
