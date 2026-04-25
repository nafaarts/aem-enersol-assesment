import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from './components/ui/table/table.module';
import { LogoutButtonComponent } from './components/common/logout-button/logout-button.component';
import { ConfirmDialogComponent } from './components/ui/confirm-dialog/confirm-dialog.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { InputComponent } from './components/ui/input/input.component';
import { InputPasswordComponent } from './components/ui/input-password/input-password.component';
import { CardComponent } from './components/ui/card/card.component';
import { BarChartComponent } from './components/ui/charts/bar-chart/bar-chart.component';
import { DonutChartComponent } from './components/ui/charts/donut-chart/donut-chart.component';

@NgModule({
    declarations: [
        LogoutButtonComponent,
        ConfirmDialogComponent,
        ButtonComponent,
        InputComponent,
        InputPasswordComponent,
        CardComponent,
        BarChartComponent,
        DonutChartComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
    ],
    exports: [
        ReactiveFormsModule,
        TableModule,
        LogoutButtonComponent,
        ConfirmDialogComponent,
        ButtonComponent,
        InputComponent,
        InputPasswordComponent,
        CardComponent,
        BarChartComponent,
        DonutChartComponent,
    ]
})
export class SharedModule { }