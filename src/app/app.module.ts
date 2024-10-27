import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
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

import { LandingPageComponent } from './layout/landing-page/landing-page.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    TopWidgetComponent,
    MainComponent,
    DashboardComponent,
    LandingPageComponent,
    XcompComponent,
    PaginationComponent,
    MainpageComponent
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
    EffectsModule.forRoot([TechnicianEffects,UserEffects]),
    TechnicianModule,
    ThemesModule,
    StoreModule.forRoot({ technician: techReducer,user : userReducer }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
