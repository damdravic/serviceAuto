import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../interfaces/order';

export const LoadOrderActions = createActionGroup({
  source: 'Order- Load',
  events: {
    Start: emptyProps(),
    Success: props<{ orders: Order[] }>(),
    Failure: props<{ error: string }>(),
  },
});

export const AddNewOrderAction = createActionGroup({
  source: 'Order - Add',
  events: {
    Start: props<{order : Order }>(),
    Success: props<{order :Order }>(),
    Failure: props<{ error: string }>(),
  },
});

export const EditOrderAction = createActionGroup({
  source: 'Order - Edit',
  events: {
    Start: props<{ order: Order }>(),
    Success: props<{ order: Order }>(),
    Faileure: props<{ error: string }>(),
  },
});
