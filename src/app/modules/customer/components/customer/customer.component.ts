import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../../model/customer';
import { selectCustomer } from '../../store/customer.selectors';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {




deleteCustomer(arg0: Customer) {
throw new Error('Method not implemented.');
}
editCustomer(arg0: Customer) {
throw new Error('Method not implemented.');
}
  searchTerm: any;
  customers$: Observable<Customer[]>;
  selectedCustomer: Customer =null;
  customerStatus :string;

constructor(private customerService : CustomerService) {}


  ngOnInit() {
    this.customerService.ngOnInit();
    this.customers$ = this.customerService.customers$;
    this.customerService.customerStatus$.subscribe(status => {
      this.customerStatus = status;
    });
    this.customers$.subscribe(customers => {
      console.log(customers);
    });
  }

  searchCustomer() {
    throw new Error('Method not implemented.');
  }
  addNewCustomer() {
    this.customerService.addNewCustomer();
  }

  selectCustomer(customer : Customer){
    this.selectedCustomer = customer;
  }
}
