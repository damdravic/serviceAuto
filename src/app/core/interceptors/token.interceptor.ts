import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { Key } from '../../enum/key';

import { CustomHttpResponse } from '../../interface/custom-http-response';
import { Profile } from '../../interface/profile';
import { UserService } from 'src/app/modules/user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isTokenRefreshing : boolean = false;
  private refreshTokenSubject : BehaviorSubject<CustomHttpResponse<Profile>> = new BehaviorSubject<any>(null);

  constructor(private userService : UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
         
    if(request.url.includes('login') || request.url.includes('register') || request.url.includes('refresh')){
    return next.handle(request);
  }
   console.log('TokenInterceptor');
     return next.handle(this.addAuthorizationHeader(request, localStorage.getItem(Key.TOKEN))).pipe(
      catchError((error : HttpErrorResponse) => {
      
        if(error instanceof HttpErrorResponse && error.status === 401 && error.error.reason.includes('expired')){
          
         return this.handleRefreshToken(request,next);
        }else{
         
          return throwError(() => error);
          
        }
      })
     );



}
 private  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) : Observable<HttpEvent<unknown>> {
    if(!this.isTokenRefreshing){
 
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.userService.refreshToken$().pipe(
        switchMap((response) => {
          console.log('TokenRefreshResponse : ', response);
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(response);
          console.log('new Token : ', response.data.accessToken);
          console.log('sending original request : ', request);
          return next.handle(this.addAuthorizationHeader(request, response.data.accessToken));

        })
      )

    }else{
      console.log('else block');
      return this.refreshTokenSubject.pipe(
        switchMap((response) => {
          return next.handle(this.addAuthorizationHeader(request, response.data.accessToken));
        })
      )
    }
  }


  private addAuthorizationHeader(request: HttpRequest<unknown>, token : string ): HttpRequest<any> {
      return request.clone({setHeaders: { Authorization: `Bearer ${token}`}});
  }






}