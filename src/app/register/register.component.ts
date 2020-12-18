import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/model/user';
import {Router} from '@angular/router';
import {ProductListComponent} from '../product-list/product-list.component';
import {ShoppingCartService} from '../core/services/shopping-cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: User;
  cartCount;
  constructor(private auth: AuthService, private router: Router, private cartService: ShoppingCartService, private toastr: ToastrService) { }

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


        let c = this.cartService.getOrCreateCart();
        let cartId = localStorage.getItem('cartId');
        let cart;
        this.cartService.getCart(cartId).subscribe( res => { cart = res;
          this.cartCount = cart.items.length;
        });

        this.cartService.prodCountCountChange.subscribe(
          newProdCount => this.cartCount = newProdCount
        );
      },
      err =>
        this.toastr.error('Email  already exist', 'Something went wrong'));}

}
