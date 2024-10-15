import { Injectable } from "@angular/core";
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from "@ngrx/store";


@Injectable()
export class TechnicianEffects{


    constructor(private actions$ : Actions){}

    loadTechs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTechs),
            
        )
    )












}