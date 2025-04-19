import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopWidgetComponent } from './widgets/top-widget/top-widget.component';
import { MainComponent } from './shared/main/main.component';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { XcompComponent } from './components/xcomp/xcomp.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { OrderModule } from './modules/order/order.module';
import { SidenavModule } from './sharedModules/sidenav/sidenav.module';
import { StoreModule } from '@ngrx/store';
import { TechnicianModule } from './modules/technician/technician.module';
import { techReducer } from './modules/technician/store/technician.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TechnicianEffects } from './modules/technician/store/technician.effect';
import { ThemesModule } from './modules/themes/themes.module';
import { MainpageComponent } from './layouts/mainpage/mainpage.component';
import { UserEffects } from './modules/user/store/user.effects';
import { userReducer } from './modules/user/store/user.reducer';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerEffects } from './modules/customer/store/customer.effects';
import { customerReducer } from './modules/customer/store/customer.reducer';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartsModule } from './modules/charts/charts.module';
import { CarModule } from './modules/car/car.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { WorkshopEffects } from './modules/workshop/store/workshop.effects';
import { workshopReducer } from './modules/workshop/store/workshop.reducer';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    TopWidgetComponent,
    MainComponent,
    DashboardComponent,
    XcompComponent,
    PaginationComponent,
    MainpageComponent,
    RegisterComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BaseChartDirective,
    OrderModule,
    SidenavModule,
    ChartsModule,
    CarModule,
    NgbModule,
    EffectsModule.forRoot([TechnicianEffects, UserEffects, CustomerEffects,WorkshopEffects]),
    TechnicianModule,
    ThemesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      technician: techReducer,
      user: userReducer,
      customerState: customerReducer,
      workshop: workshopReducer
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
