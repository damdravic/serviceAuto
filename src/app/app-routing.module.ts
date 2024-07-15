import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthorizationGuard } from './guard/authorization-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthorizationGuard]},
  {path:'',component : DashboardComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
  {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
