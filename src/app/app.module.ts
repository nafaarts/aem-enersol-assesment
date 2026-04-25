import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/common/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { UserListComponent } from './features/dashboard/components/user-list/user-list.component';
import { FirstChartComponent } from './features/dashboard/components/first-chart/first-chart.component';
import { SecondChartComponent } from './features/dashboard/components/second-chart/second-chart.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MainLayoutModule } from './core/layouts/main-layout/main-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    UserListComponent,
    FirstChartComponent,
    SecondChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MainLayoutModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
