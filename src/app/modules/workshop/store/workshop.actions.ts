import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Workshop } from 'src/app/core/interfaces/workshop';

export const WorkshopActions = createActionGroup({
  source: 'Workshop',
  events: {
    
    'Act Workshops': emptyProps(),
    'Act New Workshop': props<{newWorkshop : Workshop }>(),
    'Act Workshops Success': props<{ workshops: Workshop[] }>(),
    'Act Workshops Failure': props<{ error: string }>(),
  }
});
