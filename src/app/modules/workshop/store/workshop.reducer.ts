import { createReducer, on } from '@ngrx/store';
import {
  AddNewWorkshopAction,
  LoadWorkshopsActions,
  EditWorkshopAction,
  DeleteWorkshopAction,
} from './workshop.actions';
import { initialWorkshopState } from './workshop.state';
import { Workshop } from '../interfaces/workshop';

export const workshopFeatureKey = 'workshop';

export const workshopReducer = createReducer(
  initialWorkshopState,

  // ----------------- Add workshop --------------------

  on(AddNewWorkshopAction.start, (state, { newWorkshop }) => ({
    ...state,
    status: 'loading' as 'loading',
  })),

  on(AddNewWorkshopAction.success, (state, { workshop }) => ({
    ...state,
    workshops: [...state.workshops, workshop],
    status: 'success' as 'success',
    error: null,
  })),

  on(AddNewWorkshopAction.failure, (state, { error }) => ({
    ...state,
    status: 'failure' as 'failure',
    error: error,
  })),

  //---------------------- Load Workshops -----------------

  on(LoadWorkshopsActions.start, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),

  on(LoadWorkshopsActions.success, (state, { workshops }) => ({
    ...state,
    workshops,
    status: 'success' as 'success',
    error: null,
  })),

  on(LoadWorkshopsActions.failure, (state, { error }) => ({
    ...state,
    status: 'failure' as 'failure',
    error: error,
  })),

  //------------------Edit Workshop ---------------------

  on(EditWorkshopAction.start, (state, { workshop }) => ({
    ...state,
    status: 'pending' as 'pending',
  })),

  on(EditWorkshopAction.success, (state, { workshop }) => ({
    ...state,
    workshops: state.workshops.map((w) =>
      w.id === workshop.id ? workshop : w
    ),
    state: 'success' as 'success',
  })),

  on(EditWorkshopAction.failure, (state, { error }) => ({
    ...state,
    status: 'failure' as 'failure',
    error: error,
  })),

  // TODO delete workshop
  //--------------------Delete workshop --------------------

  on(DeleteWorkshopAction.start, (state, { id }) => ({
    ...state,
    status: 'pending' as 'pending',
  })),

  on(DeleteWorkshopAction.success, (state, { id }) => ({
    ...state,
    status: 'success' as 'success',
    workshops: state.workshops.filter((workshop) => workshop.id !== id),
  })),
  on(DeleteWorkshopAction.failure, (state, { error }) => ({
    ...state,
    status: 'failure' as 'failure',
    error: error,
  }))
);
