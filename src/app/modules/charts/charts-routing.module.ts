import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes : Routes = [
  {
    path : '',
    component : PieChartComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  
  ]
})
export class ChartsRoutingModule { }
