import { Component, OnInit } from '@angular/core';
import {User} from '../core/model/user';
import {UserService} from '../core/services/user.service';
import {Product} from '../core/model/product';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userList: User[];
  user: User;
  showError: boolean;
  loginUserData: User;
  constructor(private _auth: AuthService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    //this.user = new User();
    this.loginUserData = new User();
    //this.user.id = 10;
    //this.userService.getUsers().subscribe((data: User[]) => this.userList = data);

  }

  login(){


            console.log(this.loginUserData);
            this._auth.loginUser(this.loginUserData).subscribe(
              res => {console.log(res);
                      localStorage.setItem('token', res.access_token);
                      localStorage.setItem('userId', res.userToReturn.id);
                      localStorage.setItem('userEmail', res.userToReturn.email);
                      this.router.navigateByUrl('/manageProducts');
                      this.toastr.success('You logged in successfully', 'Welcome Back');


              },
              err => this.toastr.error('Please check your email or password', 'Something went wrong'));}

}
