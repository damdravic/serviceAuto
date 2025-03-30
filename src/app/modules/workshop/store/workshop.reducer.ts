import { createReducer, on } from '@ngrx/store';
import { WorkshopActions } from './workshop.actions';
import { initialWorkshopState } from './workshop.state';

export const workshopFeatureKey = 'workshop';

export const reducer = createReducer(
  initialWorkshopState,
  on(WorkshopActions.actNewWorkshop, (state, { newWorkshop }) => ({
    ...state,
    workshops: [
      ...state.workshops,
      {
        ...newWorkshop,
      },
    ],
  })),

  on(WorkshopActions.actWorkshops, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(WorkshopActions.actWorkshopsSuccess, (state, { workshops }) => ({
    ...state,
    workshops,
    status: 'success' as 'success',
    error: null,
  })),
  on(WorkshopActions.actWorkshopsFailure, (state, { error }) => ({
    ...state, status: 'failure' as 'failure' , error : error
  }))
);
