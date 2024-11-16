import { createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customer.state";

export const selectCustomer = createFeatureSelector<CustomerState>('customer');

export const selectAllCustomers = createSelector(
    selectCustomer,
    (state: CustomerState) => state.customers
)