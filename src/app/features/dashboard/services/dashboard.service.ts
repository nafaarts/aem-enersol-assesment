import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

export interface DashboardUser {
  firstName: string
  lastName: string
  username: string
}

export interface ChartDataPoint {
  name: string
  value: number
}

export interface DashboardResponse {
  chartDonut: ChartDataPoint[]
  chartBar: ChartDataPoint[]
  tableUsers: DashboardUser[]
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) { }

  getData(): Observable<DashboardResponse> {
    return this.http
      .get<DashboardResponse>(`${environment.apiUrl}/dashboard`)
      .pipe(delay(3000)) // simulate network latency
  }
}
