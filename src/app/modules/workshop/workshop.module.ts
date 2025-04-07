import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { EffectsModule } from '@ngrx/effects';
import { WorkshopEffects } from './store/workshop.effects';
import { FormsModule } from '@angular/forms';
import { NewWorkshopModalComponent } from './components/new-workshop-modal/new-workshop-modal.component';




@NgModule({
  declarations: [
    WorkshopComponent,
    NewWorkshopModalComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    FormsModule,
    EffectsModule.forFeature([WorkshopEffects])
  ], exports: [
    WorkshopComponent
    
  ]
})
export class WorkshopModule { }
