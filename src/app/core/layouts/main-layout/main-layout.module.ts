import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { NgModule } from '@angular/core';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    AppTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    MainLayoutComponent,
  ]
})
export class MainLayoutModule { }