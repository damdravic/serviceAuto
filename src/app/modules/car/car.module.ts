import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddNewCarComponent } from './components/add-new-car/add-new-car.component';



@NgModule({
  declarations: [
    AddNewCarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    AddNewCarComponent
  ]
})
export class CarModule { }
