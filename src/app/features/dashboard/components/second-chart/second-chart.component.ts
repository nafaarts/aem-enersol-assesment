import { Component, Input } from '@angular/core';
import { BarChartData } from 'src/app/shared/components/ui/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'second-chart',
  templateUrl: './second-chart.component.html',
  styleUrls: ['./second-chart.component.scss'],
})
export class SecondChartComponent {
  @Input() data: BarChartData[] = [];
}
