import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/interface/app-state';
import { TechnicianState } from './technician.state';

export const selectTechnician = (state : AppState) => state.technicianState;
export const selectAllTechnicians = createSelector(
    selectTechnician,
    (state : TechnicianState) => state.technicians

)