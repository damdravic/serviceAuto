import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Key } from 'src/app/enum/key';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Profile } from 'src/app/interface/profile';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


private readonly server: string = 'http://192.168.0.175:8081';
private jwtHelper = new JwtHelperService();

constructor(private http: HttpClient,private router:Router) {}

login$ = (email: string, password: string) =>
  <Observable<CustomHttpResponse<Profile>>>(
    this.http
      .post<CustomHttpResponse<Profile>>(`${this.server}/user/login`, {
        email,
        password,
      })
      .pipe(tap(console.log), catchError(this.handleError))
  );

  verifyCode$ = (email: string, code: string) =>
  <Observable<CustomHttpResponse<Profile>>>(
    this.http
      .get<CustomHttpResponse<Profile>>(
        `${this.server}/user/verify/code/${email}/${code}`
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );



  refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>> 
  this.http.get<CustomHttpResponse<Profile>>(`${this.server}/user/refresh/token`,{headers: {Authorization: `Bearer ${localStorage.getItem(Key.REFRESH_TOKEN)}`}})
  .pipe(tap(response => {
    localStorage.removeItem(Key.TOKEN);
    localStorage.removeItem(Key.REFRESH_TOKEN);
    localStorage.setItem(Key.TOKEN, response.data.accessToken);
    localStorage.setItem(Key.REFRESH_TOKEN, response.data.refreshToken);
  }))

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

public getAuth(): boolean {
  console.log('getAuth()');
  let token = localStorage.getItem(Key.TOKEN);
  console.log(token);
  if (token) {
    return this.jwtHelper.decodeToken(token) &&
      !this.jwtHelper.isTokenExpired(token)
      ? true
      : false;
  } else {
    console.log('getAuth() false');
    return false;
  }
}

 getUsers$(): Observable<{users : User[]}>{
  return this.http.get<CustomHttpResponse<{users : User[]}>>(`${this.server}/user/all`)
  .pipe(
    map(response => response.data),
    catchError(this.handleError)
  )
 }

 logout() {
  localStorage.removeItem(Key.TOKEN);
  localStorage.removeItem(Key.REFRESH_TOKEN);
  this.router.navigate(['/login']);
   
}




public isAuthenticated = ():boolean => (this.jwtHelper.decodeToken<string>(localStorage.getItem(Key.TOKEN)) && 
!this.jwtHelper.isTokenExpired(localStorage.getItem(Key.TOKEN)));



public register(user : User ): Observable<CustomHttpResponse<User>>{
  return this.http.post<CustomHttpResponse<User>>(`${this.server}/user/register`,user)
  .pipe(
    catchError(this.handleError)
  )

}

}
