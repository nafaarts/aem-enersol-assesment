import { Injectable } from "@angular/core";
import { PouchdbService } from "../database/pouchdb.service";
import { from } from "rxjs";

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

export interface DashboardCacheDoc {
    _id: string
    data: DashboardResponse
    updatedAt: string
}

const DASHBOARD_CACHE_KEY = 'dashboard-cache'

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
    constructor(private db: PouchdbService) { }

    async saveDashboard(data: DashboardResponse) {
        const updatedAt = new Date().toISOString()

        try {
            const existing = await this.db.get(DASHBOARD_CACHE_KEY)
            await this.db.put({
                ...existing,
                _id: DASHBOARD_CACHE_KEY,
                data,
                updatedAt,
            })
        } catch {
            await this.db.put({
                _id: DASHBOARD_CACHE_KEY,
                data,
                updatedAt,
            })
        }

        return updatedAt
    }

    getDashboard() {
        return from(this.db.get(DASHBOARD_CACHE_KEY))
    }
}