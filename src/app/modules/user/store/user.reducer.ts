import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { User } from 'src/app/interface/user';



export interface UserState {
  status : 'pending'|'loading' | 'loaded' | 'error';
     users: User[],
     error : string | null;
}

export const initialState: UserState = {
  status : 'pending',
  users: [],
  error : null

};

export const userReducer = createReducer(
  initialState,
  on( loadUsers, state => ({ ...state, status : 'loading' as 'loading'})),
  on( loadUsersSuccess, (state,{users}) => ({...state, status : 'loaded' as 'loaded', error : null, users : users })),
  on( loadUsersFailure, (state, {error}) => ({...state, status : 'error' as 'error', error : error}))
);

