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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { User } from './interface/user';
import { UserEffects } from './modules/user/store/user.effects';
import { userReducer } from './modules/user/store/user.reducer';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Customer } from './modules/customer/model/customer';
import { CustomerEffects } from './modules/customer/store/customer.effects';
import { customerReducer } from './modules/customer/store/customer.reducer';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CustomerModule } from './modules/customer/customer.module';

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
    OrderModule,
    SidenavModule,
    NgbModule,
    EffectsModule.forRoot([TechnicianEffects, UserEffects, CustomerEffects]),
    TechnicianModule,
    ThemesModule,
    StoreModule.forRoot({
      technician: techReducer,
      user: userReducer,
      customerState: customerReducer
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
