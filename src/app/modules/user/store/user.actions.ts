import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/interface/user';

export const loadUsers = createAction('[User] Load Users' );

export const loadUsersSuccess = createAction(
  '[User] Load User Success',
  props<{users : User[]}>()

)

export const loadUsersFailure = createAction(
  '[User] load User Failure',
  props<{error : string}>()
)