import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import { take } from 'rxjs/operators';
import {Cart} from '../model/cart';
import {Subject} from 'rxjs';
import {ProductService} from './product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url = 'http://localhost:8000/carts';
 cart = new Cart();
  pExists: boolean;




  constructor(private http: HttpClient, private productService: ProductService) { }

  private create(){
    console.log("testing the cart");
    return this.http.post<Cart>(this.url, {name: 'cart', items: []});
  }

   getCart(id)
  {
    return this.http.get<Cart>(this.url + '/' + id);

  }

  getAllCart()
  {
    return this.http.get<Cart[]>(this.url );

  }


  updateCart(c)
  {
    this.updateCount(c.items.length);

    return this.http.put(this.url + '/' + c.id, c);
  }

   getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (!cartId) {
      this.create().subscribe((res: Cart) => {
       // console.log(res);
        localStorage.setItem('cartId', res.id.toString());
            return res.id;
      });
    }
    else {
      return cartId;
    }

  }

  addToCart(p: Product){
    let cartId =localStorage.getItem('cartId');
    if(cartId) {
      this.pExists = false;
      this.getCart(cartId).subscribe((data: Cart) => {
        this.cart = data;
        console.log(this.cart);
        if (this.cart.items.length <= 0 ) {
          console.log('cart fer8aa so we add or no product');
          this.cart.items.push({itemId: p.id, quantity: 1});
        } else {
          console.log('d5alna fel if');
          for (const item of this.cart.items) {
            //console.log(item.itemId);
            if (item.itemId === p.id) {
              this.pExists = true;
              console.log('product mawjoud');
              item.quantity++;
            } }

          if (this.pExists == false) {
              console.log("ma tod5el ken ki yabda moush mawjoud");
              this.cart.items.push({itemId: p.id, quantity: 1});              //
            }


        }

        p.quantity--;
        this.productService.updateProduct(p).subscribe();
        this.updateCart(this.cart).subscribe();
        this.updateCount(this.cart.items.length);
      });
    }


  }

  private prodCount: number = 0;
  public prodCountCountChange: Subject<number> = new Subject();

  updateCount(count: number = 0): void {
    this.prodCount = count;
    this.prodCountCountChange.next(this.prodCount);
  }



}

