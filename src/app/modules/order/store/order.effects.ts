import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddNewOrderAction, LoadOrderActions } from './order.actions';
import { catchError, from, map, mergeAll, of, switchMap, tap } from 'rxjs';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  addNewOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddNewOrderAction.start),
      switchMap((action) =>
        from(this.orderService.addOrder$(action.newOrder)).pipe(
          tap((response) => {
            this.toastr.success('Order created successfully');
            this.orderService.closeModal();
            console.log('ss');
          }),
          map((response) => {
            const order = response.data;
            return AddNewOrderAction.success({ order });
          }),
          catchError((error) => of(AddNewOrderAction.failure({ error: error })))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadOrderActions.start),
      switchMap(() =>
        from(this.orderService.getAllOrders$()).pipe(
          tap((res) => console.log('API orders Effect response:', res)),
          map((response) => {
            const orders = response.data?.orders
            return LoadOrderActions.success({orders});
          }),
          catchError((error) => of(LoadOrderActions.failure({ error })))
        )
      )
    )
  );
}
