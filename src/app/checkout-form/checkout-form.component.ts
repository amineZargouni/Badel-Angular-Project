import { Component, OnInit } from '@angular/core';
import {CheckOut} from '../core/model/checkOut';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  checkOut: CheckOut;
  checkOutForm: FormGroup;
  total;
  constructor(private route: ActivatedRoute , private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }

        this.total = params.total;
        console.log(this.total); // popular
      });



    this.checkOut = new CheckOut();
    this.checkOutForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      streetAdress: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      });

  }
  get firstName(){
    return this.checkOutForm.get('firstName');
  }

  get lastName(){
    return this.checkOutForm.get('lastName');
  }

  get streetAdress(){
    return this.checkOutForm.get('streetAdress');
  }

  get phoneNumber(){
    return this.checkOutForm.get('phoneNumber');
  }

  get zipCode(){
    return this.checkOutForm.get('zipCode');
  }

  save(){
    console.log(this.checkOutForm.value);

    // this.contact = <Contact>this.registerForm.value;
    // console.warn(this.contact);
    Object.assign(this.checkOut, this.checkOutForm.value);
    console.log(this.checkOut);
    this.toastr.success('Your order has been successfully placed', 'Congratulations');
    this.router.navigate(['catalog'], { queryParams: { order: 'successful' } });


  }


}
