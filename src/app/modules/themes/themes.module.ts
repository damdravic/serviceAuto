import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes.component';
import { ThemesRoutingModule } from './themes-routing.module';



@NgModule({
  declarations: [
    ThemesComponent,
   
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule
  ],exports:[
  
    ThemesComponent,
  ]
})
export class ThemesModule { }
