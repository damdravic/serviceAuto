
import { Order } from './order';
import { OrderDataState } from './order-data-state';

export interface OrderState {
  dataState: OrderDataState;
  orders?: Order[];

  error?: string;
}

export const initialOrderState = {
  dataState: OrderDataState.LOADING,
  orders: [],
  error: null,
};
