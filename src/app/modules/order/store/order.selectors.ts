import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../interfaces/order.state';

export const selectOrder = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(
  selectOrder,
  (state: OrderState) => {
    return state.orders
  }
);
