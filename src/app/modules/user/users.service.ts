import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly server: string = 'http://192.168.0.175:8081';

  constructor( private http : HttpClient ) { }


 getUsers$(): Observable<{users : User[]}>{
  return this.http.get<CustomHttpResponse<{users : User[]}>>(`${this.server}/user/all`)
  .pipe(
    map(response => response.data),
    catchError(this.handleError)
  )
 }

 private handleError(error: HttpErrorResponse) {
  let errorMessage: string;
  console.log("error -------->", error);
  if(error.error){
    console.log("error -------->", error);
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



}
