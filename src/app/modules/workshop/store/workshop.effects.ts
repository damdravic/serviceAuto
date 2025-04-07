import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkshopActions } from './workshop.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { WorkshopService } from '../workshop.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class WorkshopEffects {
  constructor(
    private actions$: Actions,
    private workshopService: WorkshopService,
    private toater : ToastrService
  ) {}

  loadWorkshops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkshopActions.actWorkshops),
      switchMap(() =>
        from(this.workshopService.getAllWorkshops$()).pipe(
          map((response) => {
            return WorkshopActions.actWorkshopsSuccess({ workshops: response?.data?.workshops });
          }),
          catchError((error) =>
            of(WorkshopActions.actWorkshopsFailure({ error: error }))
          )
        )
      )
    )
  );

 
  addNewWorkshop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkshopActions.actNewWorkshop),
      switchMap((action) =>
        from(this.workshopService.addNewWorkshop$(action.newWorkshop)).pipe(
          tap((response) => {this.toater.success(response.message)}),
          map(() => WorkshopActions.actWorkshops()),
          catchError((error) =>of(WorkshopActions.actWorkshopsFailure({error : error}) ))
            ))
    )
  )




}
