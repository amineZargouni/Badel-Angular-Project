import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service';
import {User} from '../core/model/user';
import {AuthService} from '../core/services/auth.service';
import {ShoppingCartService} from '../core/services/shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedInUser: User;
  cartCount: number;
  navbarOpen = false;

  constructor(private userService: UserService, public auth: AuthService, private cartService: ShoppingCartService) {
    //if (userService.activeUser)
   // this.loggedInUser = userService.activeUser;

   // auth.appUser$.subscribe(appUser => this.loggedInUser = appUser);


  }

  ngOnInit(): void {
    let c = this.cartService.getOrCreateCart();
    let cartId = localStorage.getItem('cartId');
    let cart;
    this.cartService.getCart(cartId).subscribe( res =>{ cart = res;
      this.cartCount = cart.items.length;
    });

    this.cartService.prodCountCountChange.subscribe(
      newProdCount => this.cartCount = newProdCount
    );
  }

  show(){
    console.log(this.userService.activeUser);
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}

