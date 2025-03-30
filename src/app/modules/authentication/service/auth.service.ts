import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Key } from 'src/app/enum/key';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Profile } from 'src/app/interface/profile';
import { environment } from 'src/environments/environment';
import { DataStatus } from '../state/data-status';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly server: string = environment.apiUrl;


  constructor(private http: HttpClient,
    private router : Router
  ) { }

  

  login$ = (email: string, password: string) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http.post<CustomHttpResponse<Profile>>(`${this.server}/user/login`, { email, password }).pipe(
        catchError(this.handleError)
      )
    )



  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
      } else {
        errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
      }
    }
    return throwError(() => errorMessage);
  }


  setTokenAndRefreshToken(accessToken : string,refreshToken : string) {
     return new Promise((resolve) => {
          localStorage.setItem(Key.TOKEN, accessToken);
          console.log(localStorage.getItem(Key.TOKEN));
          localStorage.setItem(Key.REFRESH_TOKEN, refreshToken);
          console.log(localStorage.getItem(Key.REFRESH_TOKEN));
          resolve(true);
        }).then(() => {
          console.log('setTokensAndNavigate');
          this.router.navigate(['/']).then(success => {
            if (success) {
              console.log('Navigation successful');
            } else {
              console.log('Navigation failed');
            }
          }).catch(error => {
            console.error('Navigation error:', error);
          });
            return { dataState: DataStatus.LOADED, loginSuccess: true };
          });
  }




}
