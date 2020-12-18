import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './core/services/auth.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { CatalogComponent } from './catalog/catalog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './filter.pipe';
import {ProductService} from './core/services/product.service';
import {UserService} from './core/services/user.service';
import {ShoppingCartService} from './core/services/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SliderComponent } from './slider/slider.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {LoggedInGuardService} from './logged-in-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    CatalogComponent,
    PageNotFoundComponent,
    FilterPipe,
    ShoppingCartComponent,
    SliderComponent,
    CheckoutFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [AuthService,
              AuthGuard,
              LoggedInGuardService,
              {provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true},
                ProductService,
                UserService,
                ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
