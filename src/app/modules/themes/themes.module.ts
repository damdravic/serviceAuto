import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes.component';
import { LightComponent } from './light/light.component';
import { ThemesRoutingModule } from './themes-routing.module';



@NgModule({
  declarations: [
    ThemesComponent,
    LightComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule
  ],exports:[
    LightComponent,
    ThemesComponent,
  ]
})
export class ThemesModule { }
