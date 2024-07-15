import { TmplAstDeferredBlockLoading } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  startWith,
} from 'rxjs';
import { DataState } from 'src/app/states/data-state';
import { Key } from 'src/app/enum/key';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { LoginState } from 'src/app/states/login-state';

import { UserService } from 'src/app/service/user.service';

@Component({
  styleUrls: ['./login.component.css'],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginState$: Observable<LoginState> = of({ dataState: DataState.LOADED });

  private phoneSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  readonly DataState = DataState;
  active: boolean = false;
  signUpMode: boolean = false;

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.userService.isAuthenticated
      ? this.router.navigate(['/'])
      : this.router.navigate(['/login']);
  }

  login(loginForm: NgForm): void {
    this.loginState$ = this.userService
      .login$(loginForm.value.email, loginForm.value.password)
      .pipe(
        map((response) => {
          if (response.data.user.usingMfa) {
            this.phoneSubject.next(response.data.user.phone);
            this.emailSubject.next(response.data.user.email);

            return {
              dataState: DataState.LOADED,
              isUsingMfa: true,
              loginSuccess: false,
              phone: response.data.user.phone.substring(
                response.data.user.phone.length - 4
              ),
            };
          } else {
            console.log('response --> ' + response);
            localStorage.setItem(Key.TOKEN, response.data.accessToken);
            localStorage.setItem(Key.REFRESH_TOKEN, response.data.refreshToken);
            this.router.navigate(['/']);
            return { dataState: DataState.LOADED, loginSuccess: true };
          }
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: false }),
        catchError((error: string) => {
          return of({
            dataState: DataState.ERROR,
            isUsingMfa: false,
            loginSucces: false,
            error,
          });
        })
      );
  }

  verifyCode(verifyForm: NgForm): void {
    console.log(verifyForm.value.code + ' <-- code');
    this.loginState$ = this.userService
      .verifyCode$(this.emailSubject.value, verifyForm.value.code)
      .pipe(
        map((response) => {
          localStorage.setItem(Key.TOKEN, response.data.accessToken);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refreshToken);
          this.router.navigate(['/']);
          return {
            dataState: DataState.LOADED,
            loginSuccess: true,
            phone: this.phoneSubject.value.substring(
              this.phoneSubject.value.length - 4
            ),
          };
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: true }),
        catchError((error: string) => {
          return of({
            dataState: DataState.ERROR,
            isUsingMfa: true,
            loginSucces: false,
            error,
            phone: this.phoneSubject.value.substring(
              this.phoneSubject.value.length - 4
            ),
          });
        })
      );
  }

  public onFocus(event) {
    event.target.classList.add('active');
  }
  public onBlur(event) {
    if (event.target.value == '') {
      event.target.classList.remove('active');
    }
  }
  toggle() {
    this.signUpMode = !this.signUpMode;
    return this.signUpMode ? ' sign-up-mode' : '';
  }
}
