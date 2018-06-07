import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppointmentService } from './appointment.service';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { RoutesModule } from './/routes.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './-helpers/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './-helpers/jwt-interceptor';
import { HttpInterceptorHandler, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainComponent,
    FormComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutesModule
  ],
  providers: [AppointmentService, AlertService, AuthGuard, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
