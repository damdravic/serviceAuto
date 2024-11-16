import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { AppState } from "src/app/interface/app-state";
import { TechnicianService } from "../technician.service";
import { addTech, LoadTechFailure, loadTechs, loadTechSucccess } from './technician.actions';
import { catchError, from, map, of, switchMap } from "rxjs";
import { Technician } from "../models/technician";


@Injectable()
export class TechnicianEffects{


    constructor(private actions$ : Actions,
        private store :Store<AppState>,
    private technicianService:TechnicianService){}


loadTechs$ = createEffect( () => 
            this.actions$.pipe(
                ofType(loadTechs),
                switchMap(() =>
                 from( this.technicianService.getTechnicians$()).pipe(
                    map((response) =>  { 
                     return loadTechSucccess({ technicians : response.data?.technicians})} ),
                    catchError((error) => of(LoadTechFailure({error : error})))

            ))
        )
    );

addTech$ = createEffect( () => 
this.actions$.pipe(
    ofType(addTech),
    switchMap((action) => 
        from(this.technicianService.addTechnician$(action.content)).pipe(
            map((response) => loadTechs()),
            catchError((error) => of(LoadTechFailure({error : error})))
        )

)))




}