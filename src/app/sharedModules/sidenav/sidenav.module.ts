import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [
    SidenavComponent],
  imports: [
    SidenavRoutingModule,
    CommonModule
  ],exports:[SidenavComponent]
})
export class SidenavModule { }
