import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { WorkshopService } from '../workshop.service';
import { ToastrService } from 'ngx-toastr';
import { AddNewWorkshopAction, DeleteWorkshopAction, EditWorkshopAction, LoadWorkshopsActions } from './workshop.actions';


@Injectable()
export class WorkshopEffects {
  constructor(
    private actions$: Actions,
    private workshopService: WorkshopService,
    private toastr: ToastrService
  ) { }

  loadWorkshops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadWorkshopsActions.start),
      switchMap(() =>
        from(this.workshopService.getAllWorkshops$()).pipe(
          tap(response => console.log('API response: ', response.data?.workshops)),
          map((response) => {
            return LoadWorkshopsActions.success({
              workshops: response?.data?.workshops,
            });
          }),
          catchError((error) =>
            of(LoadWorkshopsActions.failure({ error: error }))
          )
        )
      )
    )
  );

  addNewWorkshop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddNewWorkshopAction.start),
      switchMap((action) =>
        from(this.workshopService.addNewWorkshop$(action.newWorkshop)).pipe(
          tap((response) => {
           
            this.toastr.success(response.message, "Success");
            this.workshopService.closeModal();
          }),
          map((response) => {
            const workshop = response.data.workshop;
            return AddNewWorkshopAction.success({ workshop })
          }),
          catchError((error) =>
            of(AddNewWorkshopAction.failure({ error: error }))
          )
        )
      )
    )
  );


  deleteWorkshop$ = createEffect(() =>

    this.actions$.pipe(
      ofType(DeleteWorkshopAction.start),
      mergeMap((action) =>
        this.workshopService.deleteWorkshop$(action.id).pipe(
          tap(() => this.toastr.info(`Workshop with  ${action.id} was succesifully deleted !!!`)),
          map(() => DeleteWorkshopAction.success({ id: action.id })),
          catchError((error) => of(DeleteWorkshopAction.failure({ error })))
          
        ))

      
    )


  )


  editWorkshop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditWorkshopAction.start),
      switchMap((action) =>
        from(this.workshopService.editWorkshop$(action.workshop)).pipe(
          tap(() => this.toastr.success(`Workshop  edited succesfully`)),
          map((response) => {
            const workshop = response.data?.workshop;
            this.workshopService.closeModal();
            return EditWorkshopAction.success({ workshop })
          }),
          catchError((error) => of(EditWorkshopAction.failure({error: error})))
          
          
      ))
    )
  )





}
