import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TechnicianComponent } from './components/technician/technician.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

const routes=[
  { path: 'login', component : LoginComponent},
    {path: '',component : TechnicianComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],exports : [RouterModule]
})
export class TechnicianRoutingModule { }
