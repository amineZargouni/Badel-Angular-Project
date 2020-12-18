// tslint:disable-next-line:import-spacing
import { Component, OnInit } from  '@angular/core';
import {ProductService} from '../core/services/product.service';
import {Product} from '../core/model/product';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingCartService} from '../core/services/shopping-cart.service';
import {Cart} from '../core/model/cart';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchText;
  productList: Product[];
  cartList: Cart[];
  product: Product;
  btnVal: string;
  formVisible: boolean;
  category;
  filteredProductList;
  constructor(private productService: ProductService, private router: Router, private cartService: ShoppingCartService, private modalService: NgbModal, private toastr: ToastrService, private route: ActivatedRoute) { }

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



    this.product = new Product();





    this.btnVal = 'Add';
  }

  /*onChange(){
    switch (this.product.category) {
      case 'Shirt':
        this.product.imgUrl = './assets/shirt.png';
        break;

    }
  }*/

  deleteP(id){
    this.productService.deleteProduct(id).subscribe(
      () => this.productList = this.productList.filter(p => p.id !== id));

    this.modalService.dismissAll();
    this.toastr.success('You successfully deleted a product', 'Product deleted');

  }

  save(){
    if (this.btnVal === 'Add'){
      this.productService.addProduct(this.product).subscribe(
      () => {this.filteredProductList.push(this.product);
             this.product = new Product();

      }
    );

      this.toastr.success('You successfully added a product', 'Product added');


    }else if (this.btnVal === 'Update') {

      console.log(this.product);
      this.productService.updateProduct(this.product).subscribe();
      this.product = new Product();
      this.btnVal = 'Add';
      this.toastr.success('your successfully updated a product', 'Product updated');


    }
    this.formVisible = false;
  }
  getProductById(index: number){
    return this.productList.find(x => x.id === index);
  }

  updateP(id)
  { this.formVisible = true;
    this.product = this.getProductById(id);
    this.btnVal = 'Update';
    window.scroll(0,0 );
    //return this.productService.updateProduct(this.getProductById(id)).subscribe()
  }





  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        const csv =  event.target.result;
        this.product.imgUrl = csv.toString();
      };
    }
  }

  showForm()
  { if (!this.formVisible)
    this.formVisible = true;
  else
    this.formVisible = false;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  changeParam(c){
    this.router.navigate(['manageProducts'], { queryParams: { category: c } });

  }

}
