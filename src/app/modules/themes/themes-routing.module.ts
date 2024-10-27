import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:'dashboard' , component: DashboardComponent},
  {path : 'technician', 
    loadChildren: () => import ('../technician/technician.module').then(m => m.TechnicianModule )
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThemesRoutingModule {}
