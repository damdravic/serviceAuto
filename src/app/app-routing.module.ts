import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthenticationGuard } from './core/guard/authentication.guard';

import { content } from './shared/routes'
import { MainpageComponent } from './layouts/mainpage/mainpage.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [


 {
  path: "",
  component:MainpageComponent,
  canActivate: [AuthenticationGuard],
  children :content


 },{
  path: 'login',
  component: LoginComponent
},{
  path: 'register',
  component: RegisterComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
