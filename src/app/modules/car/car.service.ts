import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Car } from './models/car';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private server = environment.apiUrl;


  constructor(private http: HttpClient,
    private ngbModal : NgbModal
  ) { }





public getAllCars$() : Observable<CustomHttpResponse<{cars : Car[]}>>{
  return this.http.get<CustomHttpResponse<{cars : Car[]}>>(
    `${this.server}/car/all`).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(this.handleError)
    );
}

public getAllCarList$(): Observable<Car[]> {
  return this.getAllCars$().pipe(
    map(response => response.data.cars)
  )
}


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
 
closeModal(){
  this.ngbModal.dismissAll();
}


}
