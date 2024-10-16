import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { AppState } from "src/app/interface/app-state";
import { TechnicianService } from "../technician.service";
import { LoadTechFailure, loadTechs, loadTechSucccess } from './technician.actions';
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
                  from(this.technicianService.getTechnicians()).pipe(
                    map((technicians) => loadTechSucccess({ technicians : technicians }) ),
                    catchError((error) => of(LoadTechFailure({error : error})))

            ))
        )
    );






}