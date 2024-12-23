import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '../model/customer';

export const loadCustomers = createAction('[Customer] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
   props<{ customers : Customer[]}>()
);

export const LoadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{error : string}>()
);

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{customer : Customer}>()
);

 export const addCustomerSuccess = createAction(
  '[Customer] Add Customer Success',
  props<{customer : Customer}>()
 )

 export const addCustomerFailure = createAction(
  '[Customer] Add Customer Failure',
  props<{error : string}>()
 )

export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id : number}>()
);


export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ customer : Customer}>()
);

export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success ',
  props<{customer : Customer}>()

);

export const updateCustomerFailure = createAction(
'[Customer] Update Customer Failure',
props<{error : string}>
);

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ id : number}>()
);

