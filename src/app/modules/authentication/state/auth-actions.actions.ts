import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success ',
  props<{
    user: any;
    isUsingMfa: boolean;
    phone?: string;
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string,isUsingMfa ?: boolean }>()
);

export const logout = createAction('[Auth] Logout');
