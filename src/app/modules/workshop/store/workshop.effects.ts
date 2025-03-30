import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkshopActions } from './workshop.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { WorkshopService } from '../../../core/services/workshop.service';



@Injectable()
export class WorkshopEffects {


  constructor(private actions$: Actions,
    private workshopService: WorkshopService,
  ) { }
  
  loadWorkshops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkshopActions.actWorkshops),
      switchMap(() =>
        from(this.workshopService.getAllWorkshops$()).pipe(
          map((response) => {
            return WorkshopActions.actWorkshopsSuccess({ workshops: response })
          }),catchError((error) => of(WorkshopActions.actWorkshopsFailure({error : error})))
          
      ))
       )
  )




}
