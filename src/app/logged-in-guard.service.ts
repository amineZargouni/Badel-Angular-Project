import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (!this.auth.loggedIn())
    {
      return true;
    }
    else {
      this.router.navigateByUrl('/catalog');
      return false;
    }
  }
}
