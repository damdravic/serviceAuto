import { createReducer, on } from '@ngrx/store';
import { AddNewOrderAction, LoadOrderActions } from './order.actions';
import { initialOrderState } from '../interfaces/order.state';
import { OrderDataState } from '../interfaces/order-data-state';

export const orderReducer = createReducer(
  initialOrderState,

  //---------------------------------Add New Order ----------------------------

  on(AddNewOrderAction.start, (state, {order}) => ({
    ...state,
    dataState: OrderDataState.LOADING,
  })),

  on(AddNewOrderAction.success, (state, {order }) => ({
    ...state,
    dataState: OrderDataState.LOADED,
    orders: [...state.orders, order],
    error: null,
  })),

  on(AddNewOrderAction.failure, (state, { error }) => ({
    ...state,
    dataState: OrderDataState.ERROR,
    error: error,
  })),

  // -----------------------------Load Orders ----------------------------------

  on(LoadOrderActions.start, (state) => ({
    ...state,
    dataState: OrderDataState.LOADING,
  })),
  on(LoadOrderActions.success, (state, { orders }) => ({
    ...state,
    dataState: OrderDataState.LOADED,
    orders,
    error: null,
  })),
  on(LoadOrderActions.failure, (state, { error }) => ({
    ...state,
    dataState: OrderDataState.ERROR,
    error: error,
  }))

  // -------------------------------------Edit Order -------------------------------
  //TODO
);
