import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interface/app-state';
import { UserService } from '../../user/user.service';
import { login, loginFailure, loginSuccess } from './auth-actions.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) =>
        this.authService.login$(credentials.email, credentials.password).pipe(
          map((response) => {
            if (response.data.user.usingMfa) {
              return loginSuccess({
                user: null,
                isUsingMfa: true,
                phone: response.data.user.phone.substring(
                  response.data.user.phone.length - 4
                ),
              });
            } else {
              this.authService.setTokenAndRefreshToken(
                response?.data?.accessToken,
                response?.data?.refreshToken
              );
              return loginSuccess({
                user: response.data.user,
                isUsingMfa: false,
              });
            }
          }),
          catchError((error) =>
            of(
              loginFailure({
                error: error.message || 'Login failed',
                isUsingMfa: false,
              })
            )
          )
        )
      )
    )
  );
}
