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

import { Key } from 'src/app/enum/key';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';

import { LoginState } from 'src/app/interface/login-state';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/modules/user/user.service';
import { Order } from 'src/app/modules/order/interfaces/order';
import { OrderDataState } from 'src/app/modules/order/interfaces/order-data-state';

@Component({
  styleUrls: ['./login.component.css'],
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginState$: Observable<LoginState> = of({ dataState: OrderDataState.LOADED });

  private phoneSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  readonly DataState = OrderDataState;
  active: boolean = false;
  signUpMode: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuthenticated
      ? this.router.navigate(['/'])
      : this.router.navigate(['/login']);
  }
  /*
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
          return this.setTokensAndNavigate(response.data.accessToken, response.data.refreshToken);

           // return { dataState: DataState.LOADED, loginSuccess: true };
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
  }*/
  /*
  setTokensAndNavigate(accessToken: string, refreshToken: string): any {
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
        return { dataState: DataState.LOADED, loginSuccess: true };
      });
    }
  */

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
            dataState: OrderDataState.LOADED,
            loginSuccess: true,
            phone: this.phoneSubject.value.substring(
              this.phoneSubject.value.length - 4
            ),
          };
        }),
        startWith({ dataState: OrderDataState.LOADING, isUsingMfa: true }),
        catchError((error: string) => {
          return of({
            dataState: OrderDataState.ERROR,
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

  register(registerForm: NgForm): void {
    this.userService
      .register(registerForm.value)
      .subscribe((response: CustomHttpResponse<User>) => {
        console.log('User registered', response);
        this.router.navigate(['/login']).then(() => {
          this.toggle();
          registerForm.reset();
        });
      }),
      (error: string) => {
        console.error('User not registered', error);
      };
  }
}
