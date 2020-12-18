import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/model/user';
import {Router} from '@angular/router';
import {ProductListComponent} from '../product-list/product-list.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerUserData = new User();
  }

  register(){
    console.log(this.registerUserData);
    console.log(this.registerUserData);
    this.auth.registerUser(this.registerUserData).subscribe(
      res => {console.log(res)
              localStorage.setItem('token', res.access_token);
              this.router.navigateByUrl('/menageProducts');

      },
      err => console.log(err)
    );
  }

}
