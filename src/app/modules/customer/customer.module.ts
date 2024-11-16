import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer/customer.component';
import { FormsModule } from '@angular/forms';
import { AddNewCustomerModalComponent } from './components/add-new-customer-modal/add-new-customer-modal.component';



@NgModule({
  declarations: [
    CustomerComponent,
    AddNewCustomerModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule
  ],exports: [CustomerComponent,
    AddNewCustomerModalComponent
  ]
})
export class CustomerModule { }