import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';
import { RepairOrderComponent } from './components/repair-order/repair-order.component';
import { AddEditOrderModalComponent} from './components/add-edit-order-modal/add-edit-order-modal.component';
import { CoreModule } from 'src/app/core/core.module';

import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './store/order.effects';
import { EditRepairOrderModalComponent } from './components/edit-repair-order-modal/edit-repair-order-modal.component';

@NgModule({
  declarations: [
    RepairOrderComponent,
    AddEditOrderModalComponent,
    EditRepairOrderModalComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    CoreModule,
    EffectsModule.forFeature([OrderEffects]),
  ],
})
export class OrderModule {}
