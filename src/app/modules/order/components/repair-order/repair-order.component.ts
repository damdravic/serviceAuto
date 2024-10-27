import { Component } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { RepairOrderState } from 'src/app/interface/repair-order-state';
import { DataState } from 'src/app/interface/data-state';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderService } from 'src/app/core/services/repair-order.service';

@Component({
  selector: 'app-repair-order',
  templateUrl: './repair-order.component.html',
  styleUrl: './repair-order.component.css'
})
export class RepairOrderComponent {
  orders: RepairOrder[] = [];

  constructor( private orderService : RepairOrderService) { }

   orderState$: Observable<RepairOrderState> = of({ dataState: DataState.LOADED });


      ngOnInit(): void {
       this.orderState$ = this.orderService.getAllOrders$().pipe(

       map((response) => {
          console.log("Aici response data ==> " + response.data.repairOrders);
          this.orders = response.data.repairOrders;
          return {
            dataState: DataState.LOADED,
          
          }
        
       }),
       startWith({ dataState: DataState.LOADING }),
        catchError((error) => {
          return of({ dataState: DataState.ERROR, error: error });
        }




       ))
      

      }





}
