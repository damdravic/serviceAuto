import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianComponent } from './components/technician/technician.component';



@NgModule({
  declarations: [
    TechnicianComponent
  ],
  imports: [
    CommonModule
  ],exports : [
    TechnicianComponent
  ]
})
export class TechnicianModule { }
