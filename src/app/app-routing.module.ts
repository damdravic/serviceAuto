import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RepairOrderComponent } from './modules/order/components/repair-order/repair-order.component';

import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { TechnicianComponent } from './modules/technician/components/technician/technician.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LandingPageComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'repairOrder',
        component: RepairOrderComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path:'technician',
        component: TechnicianComponent,
        canActivate: [AuthenticationGuard],
      }
    ],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
