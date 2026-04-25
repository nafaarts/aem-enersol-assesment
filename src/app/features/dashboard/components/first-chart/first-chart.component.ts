import { Component, Input } from '@angular/core';
import { DonutChartData } from 'src/app/shared/components/ui/charts/donut-chart/donut-chart.component';

@Component({
  selector: 'first-chart',
  templateUrl: './first-chart.component.html',
  styleUrls: ['./first-chart.component.scss'],
})
export class FirstChartComponent {
  @Input() data: DonutChartData[] = [];
}
