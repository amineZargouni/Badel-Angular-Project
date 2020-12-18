import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _loginUrl = 'http://localhost:8000/auth/login';
  // tslint:disable-next-line:variable-name
  private _registerUrl = 'http://localhost:8000/auth/register';

  user$: Observable<any>;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  loginUser(user)
  {
    this.user$ = this.http.post<any>(this._loginUrl, user);
    return this.user$;
  }

  logoutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('cartId');

    this.router.navigateByUrl('/login');

  }


  registerUser(user)
  {
    this.user$ = this.user$ = this.http.post<any>(this._registerUrl, user);
    return this.user$;

  }

  loggedIn(){
    return !!localStorage.getItem('token');

  }

  getToken()
  {
    return localStorage.getItem('token');
  }



}

