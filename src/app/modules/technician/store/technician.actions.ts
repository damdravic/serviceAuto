import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Technician } from '../models/technician';

export const  addTech = createAction(
  '[Technician] Add Tech',
  props<{ content : Technician}>()
);

export const removeTech = createAction(
  '[Technician] Remove Tech',
  props<{id : number}>()
)


export const loadTechs = createAction(
  '[Technician] Load Techs'
)
 
export const loadTechSucccess = createAction(
  '[Technician] Load TechSuccess',
  props<{technicians : Technician[]}>()

)


export const LoadTechFailure = createAction(
  '[Technician] Load Failure',
  props<{error : string}>()
)