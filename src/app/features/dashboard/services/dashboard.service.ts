import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, delay, from, map, mergeMap, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { DashboardCacheDoc, DashboardRepository, DashboardResponse } from 'src/app/core/repositories/dashboard.repository'

export interface DashboardDataResult {
    data: DashboardResponse
    source: 'network' | 'cache'
    updatedAt: string | null
    message?: string
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(
        private http: HttpClient,
        private dashboardRepo: DashboardRepository,
    ) { }

    getData(): Observable<DashboardDataResult> {
        return this.http
            .get<DashboardResponse>(`${environment.apiUrl}/dashboard`)
            .pipe(
                delay(3000),
                mergeMap(data => from(this.dashboardRepo.saveDashboard(data)).pipe(
                    map(updatedAt => ({
                        data,
                        source: 'network' as const,
                        updatedAt,
                    }))
                )),
                catchError((err) => {
                    if (err.status === 0) {
                        console.info('The user may be offline, getting data from cache.')
                        return this.dashboardRepo.getDashboard().pipe(
                            map(doc => {
                                const cache = doc as unknown as DashboardCacheDoc
                                return {
                                    data: cache.data,
                                    source: 'cache' as const,
                                    updatedAt: cache.updatedAt,
                                    message: cache.updatedAt ? `Cached Dashboard Data - Last updated at ${cache.updatedAt}.` : '',
                                }
                            }),
                            catchError(() => {
                                return throwError(() => new Error('No cached dashboard data found.'))
                            })
                        )
                    }

                    return throwError(() => err)
                })
            )
    }
}
