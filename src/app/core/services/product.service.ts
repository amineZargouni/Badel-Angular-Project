import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //url = 'http://localhost:3000/products';
  url = 'http://localhost:8000/products';
  constructor(private http: HttpClient) { }

  getProducts()
  {
      return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id)
  {
      return this.http.delete<Product[]>(this.url + '/' + id);
  }

  addProduct(p: Product){
    return this.http.post(this.url, p);
  }

  searchProduct(id)
  {
    return this.http.get(this.url + '/' + id);
  }
  updateProduct(p: Product)
  {
    return this.http.put(this.url + '/' + p.id, p);
  }


  getProductName(id: number, listProducts: Product[])
  {
    return listProducts.find(p => p.id === id);
  }

}
