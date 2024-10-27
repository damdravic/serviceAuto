import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { RepairOrderComponent } from './modules/order/components/repair-order/repair-order.component';

import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { TechnicianComponent } from './modules/technician/components/technician/technician.component';
import { content } from './shared/routes'
import { MainpageComponent } from './layouts/mainpage/mainpage.component';

const routes: Routes = [

 {
  path: "",
  component:MainpageComponent,
  canActivate: [AuthenticationGuard],
  children :content


 },{
  path: 'login',
  component: LoginComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
