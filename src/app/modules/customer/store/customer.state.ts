import { Customer } from "../model/customer";

export interface CustomerState {
    customers: Customer[];
    error: string;
    status: 'pending' | 'success' | 'failure' | 'loading';


}


export const initialCustomerState: CustomerState = {
    customers: [],
    error: null,
    status: 'pending'
}