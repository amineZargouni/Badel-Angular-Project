import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../core/services/shopping-cart.service';
import {Cart} from '../core/model/cart';
import {Product} from '../core/model/product';
import {ProductService} from '../core/services/product.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private cartService: ShoppingCartService, public productService: ProductService, private route: Router,  private modalService: NgbModal, private toastr: ToastrService) { }
  cartId ;
  cartCount;
  cart = new Cart();
  cartItems = new Cart().items;
  productList: Product[];

  subTotal = 0;
  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId');
    this.cartService.getCart(this.cartId ).subscribe((data: Cart) => {
      this.cart = data;
      console.log(this.cart);

      if (this.cart.items.length >= 0) {

        this.cartItems = this.cart.items;
      }
      console.log("hedhom el items" + this.cartItems);


      this.productService.getProducts().subscribe((data: Product[]) => {this.productList = data;
        this.CalculateTotal();

        });


    });

    this.cartService.prodCountCountChange.subscribe(
      newProdCount => this.cartCount = newProdCount
    );
  }


  deleteItem(item)
  {
    // @ts-ignore
    this.cart.items = this.cart.items.filter(i => i.itemId !== item.itemId);
    this.subTotal = 0 ;
    this.CalculateTotal()

    // delete this.cart.items.find(i => i.itemId == item.id);
    this.cartService.updateCart(this.cart).subscribe();
    this.modalService.dismissAll();

    this.toastr.success('You successfully deleted a product from your cart', 'Product deleted');


  }



  /*onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/asdlf7asdf',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
        response => {
          console.log(response);
        }
      );
    }
  }*/

  CalculateTotal()
  {
    for(let i of this.cart.items){
      this.subTotal += this.productService.getProductName(i.itemId,this.productList).price * i.quantity;

    }
  }

  RedirectToBuy(){
    this.route.navigateByUrl('catalog');
  }


  RedirectToCheckOut(){
    this.route.navigate(['check-out'], { queryParams: { total: this.subTotal } });

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
