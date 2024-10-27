import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';



export const selectUser = createFeatureSelector<UserState>('user');
export const selectAllUsers = createSelector(
     selectUser,
     (state :UserState) => state.users
)