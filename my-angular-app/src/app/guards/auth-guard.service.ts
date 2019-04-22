import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../user.data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userDataService: UserDataService, private router: Router, public jwtHelper: JwtHelperService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated()) {
      return true
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('IMStoken');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
