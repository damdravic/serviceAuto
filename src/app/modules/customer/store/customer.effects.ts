import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interface/app-state';
import { CustomerService } from '../customer.service';
import { loadCustomers, loadCustomersSuccess, LoadCustomersFailure, addCustomer, updateCustomer, deleteCustomer, addCustomerSuccess } from './customer.actions';
import { catchError, delay, from, map, of, switchMap } from 'rxjs';



@Injectable()
export class CustomerEffects {


  constructor(private actions$: Actions,
    private store : Store<AppState>,
    private service: CustomerService){}
  

loadCustomers$ = createEffect(() => 
  this.actions$.pipe(
    ofType(loadCustomers),
    switchMap( () => 
      from(this.service.getCustomers$()).pipe(
        map((response) => {
          return loadCustomersSuccess({ customers : response.data?.customers})
        }),catchError((error) => of(LoadCustomersFailure({error : error})) )
      )
  )
));

addCustomer$ = createEffect(() =>
 this.actions$.pipe(
    ofType(addCustomer),
    switchMap( (action) =>
       from(this.service.addCustomer(action.customer)).pipe(
        delay(1000),
        map((response) => {
        return addCustomerSuccess({customer : response.data?.customer})}),
       )),catchError((error) => of(LoadCustomersFailure({error : error}))
 )));

 updateCustomer$ = createEffect(() =>
this.actions$.pipe(
  ofType(updateCustomer),
  switchMap((action) =>
  from(this.service.updateCustomer(action.customer)).pipe(
    map((response) => loadCustomers()),
    catchError((error) => of(LoadCustomersFailure({error : error})  
  ))
))));

deleteCustoemr$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteCustomer),
  switchMap((action) =>
  from(this.service.deleteCustomer(action.id)).pipe(
    map((response) => loadCustomers()),
    catchError((error) => of(LoadCustomersFailure({error : error}))
  ))
)))



}
