import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { Store } from '@ngrx/store';
import { addCustomer } from '../../store/customer.actions';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-add-new-customer-modal',
  templateUrl: './add-new-customer-modal.component.html',
  styleUrl: './add-new-customer-modal.component.css',
  standalone: false,
})
export class AddNewCustomerModalComponent {
  constructor(private customerService: CustomerService, private store: Store) {}

  save(form: NgForm) {
    const customer = this.createCustomer(form);

    this.store.dispatch(addCustomer({ customer: customer }));
    this.customerService.closeModal();
  }

  private createCustomer(form: NgForm): Customer {
    const customer: Customer = new Customer();

    const newCustomer = {
      ...customer,
      ...form.value,
    };
    return newCustomer;
  }

  closeModal() {
    this.customerService.closeModal();
  }
}
