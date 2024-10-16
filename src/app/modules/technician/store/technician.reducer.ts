import { createReducer, on } from '@ngrx/store';
import { addTech, LoadTechFailure, loadTechs, loadTechSucccess, removeTech } from './technician.actions';
import { initialTecniciansState } from './technician.state';

export const techReducer = createReducer(
  initialTecniciansState,
  on(addTech, (state, { content }) => ({
    ...state,
    technicians: [
      ...state.technicians,
      {
        ...content,
      },
    ],
  })),

  on(removeTech, (state, { id }) => ({
    ...state,
    technicians: state.technicians.filter((technician) => technician.id !== id),
  })),

  on(loadTechs, (state) => ({ ...state, status: 'loading' as 'loading' }) ),
  on(loadTechSucccess, (state, { technicians} ) => ( {...state, technicians, status : 'success' as 'success', error : null})),
  on(LoadTechFailure, (state, {error}) => ({...state, status : 'failure' as 'failure' , error : error}))
);
