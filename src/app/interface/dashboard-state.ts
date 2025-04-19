import { OrderDataState } from '../modules/order/interfaces/order-data-state';


export interface DashboardState {
  dataState: OrderDataState.LOADED;
  error?: string;
  message?: string;
}
