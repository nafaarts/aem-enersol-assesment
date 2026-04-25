import { Component } from '@angular/core';

@Component({
  selector: 'td[app-td]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent {}
