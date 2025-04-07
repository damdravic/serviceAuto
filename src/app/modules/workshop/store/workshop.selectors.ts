import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { WorkshopState } from './workshop.state';

export const selectWorkshop = createFeatureSelector<WorkshopState>('workshop');

export const selectAllWorkshops = createSelector(
    selectWorkshop,
    (state : WorkshopState) => state.workshops
)