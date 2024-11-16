import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interface/app-state';
import { UserService } from '../user.service';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {}


loadUsers$ =createEffect(
  () => this.actions$.pipe(
     ofType(loadUsers),
     switchMap(() =>
    from(this.userService.getUsers$()).pipe(
      map( (response) => {
        console.log("response", response.users)
        return loadUsersSuccess({users : response.users})
      } ),
      catchError((error) => of(loadUsersFailure({error : error})
    ))
  )
)));




}
