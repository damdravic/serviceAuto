import { OrderDataState } from "../modules/order/interfaces/order-data-state";//TODO need to change

export interface LoginState {
  dataState: OrderDataState;
  loginSuccess?: boolean;
  error?: string;
  message?: string;
  isUsingMfa?: boolean;
  phone?: string;
}
