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
  props<{ customer : Customer}>()
);

export const removeCustomer = createAction(
  '[Customer] Remove Customer',
  props<{ id : number}>()
);


export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ customer : Customer}>()
);

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ id : number}>()
);

