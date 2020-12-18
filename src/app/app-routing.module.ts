import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckoutFormComponent} from './checkout-form/checkout-form.component';
import {LoggedInGuardService} from './logged-in-guard.service';


const routes: Routes = [
  {path: '', component : HomeComponent, canActivate: [LoggedInGuardService]},
  {path: 'manageProducts', component : ProductListComponent, canActivate: [AuthGuard]},
  {path: 'catalog', component : CatalogComponent, canActivate: [AuthGuard]},
  {path: 'cart', component : ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'check-out', component : CheckoutFormComponent, canActivate: [AuthGuard]},
  {path: 'login', component : LoginComponent, canActivate: [LoggedInGuardService]},
  {path: 'register', component : RegisterComponent, canActivate: [LoggedInGuardService]},
  {path: '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
