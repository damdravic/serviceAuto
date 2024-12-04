import { createReducer, on } from '@ngrx/store';
import { initialCustomerState } from './customer.state';
import { addCustomer, addCustomerSuccess, addCustomerFailure, deleteCustomer, loadCustomers, LoadCustomersFailure, loadCustomersSuccess,  updateCustomer } from './customer.actions';

export const customerFeatureKey = 'customer';

export const customerReducer = createReducer(
  initialCustomerState,
  on(addCustomer, (state,{customer}) =>({
    ...state,
  status : 'loading' as 'loading',
  error : null
    
  })),
  on (addCustomerSuccess, (state, {customer}) => ({
    ...state,
    customers : [
      ...state.customers,
      customer
    ],
    status : 'success' as 'success',
    error : null


  })),
  on(addCustomerFailure, (state,{error}) =>({
    ...state,
    status : 'failure' as 'failure',
    error : error

  })),

  on(deleteCustomer, (state, { id }) => ({
    ...state,
    customers: state.customers.filter((customer) => customer.id !== id),
  })),

  on(loadCustomers, (state) => ({ ...state, status: 'loading' as 'loading' }) ),
  on(loadCustomersSuccess, (state, { customers} ) => ( {...state, customers, status : 'success' as 'success', error : null})),
  on(LoadCustomersFailure, (state, {error}) => ({...state, status : 'failure' as 'failure' , error : error})),
  on(updateCustomer, (state, {customer}) => ({
    ...state,
    customers : state.customers.map((c) => c.id === customer.id ? customer : c )
  }))
);
