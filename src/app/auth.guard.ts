import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){ }
  canActivate(): boolean {
    if(this.auth.loggedIn())
    {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }


}
