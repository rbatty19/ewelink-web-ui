import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return !localStorage.getItem('data');
  }

}
