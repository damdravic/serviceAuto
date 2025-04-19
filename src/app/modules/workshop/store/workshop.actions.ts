import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Workshop } from 'src/app/core/interfaces/workshop';

export const LoadWorkshopsActions = createActionGroup({
  source: 'Workshop -Load',
  events: {
    'Start': emptyProps(),
    'Success': props<{ workshops: Workshop[] }>(),
    'Failure': props<{ error: string }>()
    },
  }
);

export const AddNewWorkshopAction = createActionGroup({
  source: 'Workshop - Add',
  events: {
    'Start': props<{ newWorkshop: Workshop }>(),
    'Success': props<{ workshop: Workshop }>(),
    'Failure': props<{ error: string }>(),
  }
});

export const DeleteWorkshopAction = createActionGroup({
 
  source: 'Workshop - Delete',
  events: {
    'Start': props<{ id: number }>(),
    'Success': props<{ id: number }>(),
    'Failure': props<{ error: string }>()
     
  }

});


export const EditWorkshopAction = createActionGroup({
  source: 'workshop - Edit',
  events: {
    'Start': props<{ workshop: Workshop }>(),
    'Success': props<{ workshop: Workshop }>(),
    'Failure': props<{ error: string }>(),
  }
  
});