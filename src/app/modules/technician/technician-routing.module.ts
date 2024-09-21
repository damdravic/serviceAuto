import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TechnicianComponent } from './components/technician/technician.component';

const routes=[
  {
    path: 'technician',component : TechnicianComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class TechnicianRoutingModule { }
