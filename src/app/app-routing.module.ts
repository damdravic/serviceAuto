import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthenticationGuard } from './core/guard/authentication.guard';

import { content } from './shared/routes'
import { MainpageComponent } from './layouts/mainpage/mainpage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';

const routes: Routes = [


 {
  path: '',
  component:MainpageComponent,
  canActivate: [AuthenticationGuard],
  children :content
 },
 {
  path: 'auth',
  loadChildren : () =>  import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
