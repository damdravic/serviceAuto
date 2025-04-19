import { Component } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { OrderDataState } from '../../interfaces/order-data-state';
import { OrderState } from '../../interfaces/order.state';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../order.service';



@Component({
  selector: 'app-repair-order',
  templateUrl: './repair-order.component.html',
  styleUrl: './repair-order.component.css',
  standalone: false,
})
export class RepairOrderComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  orderState$: Observable<OrderState> = of({
    dataState: OrderDataState.LOADED,
  });

  ngOnInit(): void {
    this.orderState$ = this.orderService.getAllOrders$().pipe(
      map((response) => {
        console.log('Aici response data ==> ' + response.data.orders);
        this.orders = response.data.orders;
        return {
          dataState: OrderDataState.LOADED,
        };
      }),
      startWith({ dataState: OrderDataState.LOADING }),
      catchError((error) => {
        return of({ dataState: OrderDataState.ERROR, error: error });
      })
    );
  }
}
