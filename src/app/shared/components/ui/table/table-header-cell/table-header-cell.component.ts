import { Component, EventEmitter, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'th[app-th]',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
})
export class TableHeaderCellComponent {
  @Input() sortable = false;
  @Input() sortDir: SortDirection = null;
  @Output() sorted = new EventEmitter<void>();

  onClick(): void {
    if (!this.sortable) return;
    this.sorted.emit();
  }
}
