import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsRoutingModule } from './charts-routing.module';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { CoreModule } from 'src/app/core/core.module';
import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [
    PieChartComponent
  ],
  imports: [
    CommonModule,
     BaseChartDirective,
    CoreModule,
    ChartsRoutingModule
  ],
  exports: [
    PieChartComponent
  ]
})
export class ChartsModule { }
