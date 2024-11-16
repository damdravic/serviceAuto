import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianComponent } from './components/technician/technician.component';
import { TechnicianRoutingModule } from './technician-routing.module';
import { AddTechnicianComponent } from './components/add-technician/add-technician.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechnicianComponent,
    AddTechnicianComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    FormsModule,
  ],exports : [
    TechnicianComponent, AddTechnicianComponent
  ]
})
export class TechnicianModule { }
