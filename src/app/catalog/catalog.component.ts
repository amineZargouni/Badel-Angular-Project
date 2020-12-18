import { Component, OnInit } from '@angular/core';
import {Product} from '../core/model/product';
import {ProductService} from '../core/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingCartService} from '../core/services/shopping-cart.service';
import {Cart} from '../core/model/cart';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  searchText;
  productList: Product[];
  filteredProductList: Product[];
  cartList: Cart[];
  product: Product;
  category;
  constructor(private productService: ProductService, private router: Router, private cartService: ShoppingCartService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe((data: Product[]) => {
      this.productList = data;

      this.route.queryParams
        .subscribe(params => {
          console.log("hedhi el paraù" + params.category);
          if (params.category){
            this.category = params.category;
            this.filteredProductList = this.productList.filter( p => p.category === params.category);
          }
          else {
            this.filteredProductList = this.productList;
          }// { order: "popular" }

        });






      },
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this.router.navigateByUrl('/login');
          }
        }
      });
  }





  getProductById(index: number){
    return this.productList.find(x => x.id === index);
  }

  addToCart(id){
    let p = this.getProductById(id);
    let cartId = localStorage.getItem('cartId');
    this.cartService.addToCart(p);
  }

  getColor(p): string
  {
    if(p){
    if (p.quantity<=0)
    {
      return "crimson";
      return "white"
    }}
  }


  getTextColor(p): string
  {
    if(p){
      if (p.quantity<=0)
      {
        return "white";
        return "black"
      }}
  }

  changeParam(c){
    this.router.navigate(['catalog'], { queryParams: { category: c } });

  }

}
