import { Component, OnInit } from '@angular/core';
import {
  DashboardService,
  DashboardUser,
} from './services/dashboard.service';
import { DonutChartData } from 'src/app/shared/components/ui/charts/donut-chart/donut-chart.component';
import { BarChartData } from 'src/app/shared/components/ui/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  donutData: DonutChartData[] = [];
  barData: BarChartData[] = [];
  users: DashboardUser[] = [];

  isLoading = false;
  hasError = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.isLoading = true;
    this.hasError = false;

    this.dashboardService.getData().subscribe({
      next: (res) => {
        this.donutData = res.chartDonut.map(data => ({
          label: data.name,
          value: data.value
        }));

        this.barData = res.chartBar.map(data => ({
          label: data.name,
          value: data.value
        }));

        this.users = res.tableUsers;

        this.isLoading = false;
      },
      error: (error: any) => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
