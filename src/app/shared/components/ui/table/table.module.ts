import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableHeadComponent } from './table-head/table-head.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';
import { TableCellComponent } from './table-cell/table-cell.component';

const TABLE_COMPONENTS = [
  TableComponent,
  TableHeadComponent,
  TableBodyComponent,
  TableRowComponent,
  TableHeaderCellComponent,
  TableCellComponent,
];

@NgModule({
  declarations: TABLE_COMPONENTS,
  imports: [CommonModule],
  exports: TABLE_COMPONENTS,
})
export class TableModule {}
