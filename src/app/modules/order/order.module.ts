import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';
import { RepairOrderComponent } from './components/repair-order/repair-order.component';
import { AddNewOrderModalComponent } from './components/add-new-order-modal/add-new-order-modal.component';
import { EditRepairOrderModalComponent } from './components/edit-repair-order-modal/edit-repair-order-modal.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    RepairOrderComponent,
    AddNewOrderModalComponent,
    EditRepairOrderModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    CoreModule
  ]
})
export class OrderModule { }
