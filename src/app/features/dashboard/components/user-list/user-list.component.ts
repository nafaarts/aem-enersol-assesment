import { Component, Input } from '@angular/core';
import { DashboardUser } from 'src/app/core/repositories/dashboard.repository';
import { SortDirection } from 'src/app/shared/components/ui/table/table-header-cell/table-header-cell.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  private _source: DashboardUser[] = [];

  @Input() set users(data: DashboardUser[]) {
    this._source = data ?? [];
    this.rows = [...this._source];
    this.sortField = null;
    this.sortDir = null;
  }

  rows: DashboardUser[] = [];
  sortField: keyof DashboardUser | null = null;
  sortDir: SortDirection = null;

  onSort(field: keyof DashboardUser): void {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortDir = 'asc';
    } else {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : this.sortDir === 'desc' ? null : 'asc';
      if (!this.sortDir) this.sortField = null;
    }

    if (!this.sortDir) {
      this.rows = [...this._source];
      return;
    }

    const dir = this.sortDir;
    this.rows = [...this._source].sort((a, b) => {
      const cmp = String(a[field]).localeCompare(String(b[field]));
      return dir === 'asc' ? cmp : -cmp;
    });
  }
}
