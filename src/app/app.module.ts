import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,

} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopWidgetComponent } from './widgets/top-widget/top-widget.component';
import { MainComponent } from './shared/main/main.component';
import { CommonModule } from '@angular/common';


import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { XcompComponent } from './components/xcomp/xcomp.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { OrderModule } from './modules/order/order.module';
import { SidenavModule } from './sharedModules/sidenav/sidenav.module';
import { StoreModule } from '@ngrx/store';
import { TechnicianModule } from './modules/technician/technician.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    TopWidgetComponent,
    MainComponent,
    LandingPageComponent,
    XcompComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    OrderModule,
    SidenavModule,
    NgbModule,
    TechnicianModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
