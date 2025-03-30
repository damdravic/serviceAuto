import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { EffectsModule } from '@ngrx/effects';
import { WorkshopEffects } from './store/workshop.effects';




@NgModule({
  declarations: [
    WorkshopComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    EffectsModule.forFeature([WorkshopEffects])
  ], exports: [
    WorkshopComponent
    
  ]
})
export class WorkshopModule { }
