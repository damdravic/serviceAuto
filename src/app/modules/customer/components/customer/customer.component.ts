import { Component } from '@angular/core';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  searchTerm: any;
  customers$: any;

constructor(private customerService : CustomerService) {}


  searchCustomer() {
    throw new Error('Method not implemented.');
  }
  addNewCustomer() {
    this.customerService.addNewCustomer();
  }
}
