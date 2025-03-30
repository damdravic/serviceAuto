import { createReducer, on } from '@ngrx/store';

import { initialState } from './auth-state';
import { login } from './auth-actions.actions';
import { DataState } from 'src/app/interface/data-state';
import { DataStatus } from './data-status';


export const authReducerFeatureKey = 'authReducer';


export const reducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    dataState: DataStatus.LOADING,
    error : null
  }))
);

