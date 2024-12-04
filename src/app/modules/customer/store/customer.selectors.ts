import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "./customer.state";
import { AppState } from "src/app/interface/app-state";

//export const selectCustomer = createFeatureSelector<CustomerState>('customer');

export const selectCustomer = createFeatureSelector< CustomerState>('customerState');
export const selectAllCustomers = createSelector(
    selectCustomer,
    (state: CustomerState) => state.customers
)
export const selectCustomerStatus = createSelector(
    selectCustomer,
    (state : CustomerState) => state.status

)