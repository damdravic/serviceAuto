import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Customer } from './model/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewCustomerModalComponent } from './components/add-new-customer-modal/add-new-customer-modal.component';
import { AppState } from 'src/app/interface/app-state';
import { Store } from '@ngrx/store';
import { selectAllCustomers, selectCustomerStatus } from './store/customer.selectors';


@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnInit {

  

private server =  'http://192.168.0.175:8081';

customers$ = this.store.select(selectAllCustomers);
customerStatus$ = this.store.select(selectCustomerStatus);

  constructor( private http: HttpClient,
     private modal: NgbModal,
     private store : Store<AppState> 
    ) { 
    

    }
  ngOnInit(): void {
    this.store.dispatch({type: '[Customer] Load Customers'});
   
  }


getCustomers$() : Observable<CustomHttpResponse<{customers: Customer[]}>>{
 return this.http.get<CustomHttpResponse<{customers: Customer[]}>> 
      (`${this.server}/customer/all`).pipe(
        tap(response => console.log('API Response:', response)),
        catchError(this.handleError)
      );
}



private handleError(error: HttpErrorResponse) {
  let errorMessage: string;

  if(error.error){
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    if (error.error.reason) {
      errorMessage = error.error.reason;
    } else {
      errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
    }
  }}else{
    errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
  }
  return throwError(() => errorMessage);
}

addNewCustomer(){
  this.modal.open(AddNewCustomerModalComponent, {size: 'lg', centered: true});
}

addCustomer(customer : Customer): Observable<CustomHttpResponse<{customer : Customer}>> {
  console.log("value");
  return this.http.post<CustomHttpResponse<{customer : Customer}>>(
    `${this.server}/customer/add`,customer 
  ).pipe(
    catchError(this.handleError)
  )
}

updateCustomer(customer: Customer): Observable<CustomHttpResponse<Customer>> {
return this.http.put<CustomHttpResponse<Customer>>(
  `${this.server}/customer/update`,customer
).pipe(
  catchError(this.handleError)
)
}

deleteCustomer(id : number): Observable<CustomHttpResponse<String>>{
  return this.http.delete<CustomHttpResponse<String>>(
    `${this.server}/customer/delete/${id}`).pipe(
      catchError(this.handleError)
    )
}







closeModal(){
  this.modal.dismissAll();
}
}
