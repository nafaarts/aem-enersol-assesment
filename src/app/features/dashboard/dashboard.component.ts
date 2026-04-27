import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, pairwise, startWith, takeUntil } from 'rxjs'
import { NetworkService } from 'src/app/core/services/network.service'
import { DashboardService } from './services/dashboard.service'
import { DonutChartData } from 'src/app/shared/components/ui/charts/donut-chart/donut-chart.component'
import { BarChartData } from 'src/app/shared/components/ui/charts/bar-chart/bar-chart.component'
import { DashboardUser } from 'src/app/core/repositories/dashboard.repository'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  donutData: DonutChartData[] = []
  barData: BarChartData[] = []
  users: DashboardUser[] = []

  isLoading = false
  hasError = false
  errorMessage = ''
  statusMessage = ''
  isOnline = navigator.onLine

  private readonly destroy$ = new Subject<void>()

  constructor(
    private dashboardService: DashboardService,
    private networkService: NetworkService,
  ) { }

  ngOnInit(): void {
    this.load()

    // Reaload if user back online.
    this.networkService.online$
      .pipe(
        startWith(this.isOnline),
        pairwise(),
        takeUntil(this.destroy$),
      )
      .subscribe(([wasOnline, isOnline]) => {
        this.isOnline = isOnline

        if (!wasOnline && isOnline) {
          this.load()
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private load(): void {
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.hasError = false
    this.errorMessage = ''

    this.dashboardService.getData().subscribe({
      next: (res) => {
        this.donutData = res.data.chartDonut.map(data => ({
          label: data.name,
          value: data.value
        }))

        this.barData = res.data.chartBar.map(data => ({
          label: data.name,
          value: data.value
        }))

        this.users = res.data.tableUsers
        this.statusMessage = res.message

        this.isLoading = false
      },
      error: (error: any) => {
        this.hasError = true
        this.errorMessage = error?.message ?? 'Failed to load dashboard data.'
        this.isLoading = false
      },
    })
  }
}
