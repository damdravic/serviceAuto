import { createReducer, on } from '@ngrx/store';
import { initialCustomerState } from './customer.state';
import { addCustomer, loadCustomers, LoadCustomersFailure, loadCustomersSuccess, removeCustomer } from './customer.actions';


export const customerFeatureKey = 'customer';



export const customerReducer = createReducer(
  initialCustomerState,
  on(addCustomer, (state, { customer }) =>({
    ...state,
    customers : [
      ...state.customers,{
        ...customer
      }
    ]
  })),

  on(removeCustomer, (state, { id }) => ({
    ...state,
    customers: state.customers.filter((customer) => customer.id !== id),
  })),

  on(loadCustomers, (state) => ({ ...state, status: 'loading' as 'loading' }) ),
  on(loadCustomersSuccess, (state, { customers} ) => ( {...state, customers, status : 'success' as 'success', error : null})),
  on(LoadCustomersFailure, (state, {error}) => ({...state, status : 'failure' as 'failure' , error : error}))
  
);
 
