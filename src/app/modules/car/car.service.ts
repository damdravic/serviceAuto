import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Car } from './models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private server = 'http://192.168.0.175:8081';


  constructor(private http: HttpClient) { }





public getAllCars$() : Observable<CustomHttpResponse<{cars : Car[]}>>{
  return this.http.get<CustomHttpResponse<{cars : Car[]}>>(
    `${this.server}/car/all`).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(this.handleError)
    );
}









  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }




}
