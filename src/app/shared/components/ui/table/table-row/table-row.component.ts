import { Component } from '@angular/core';

@Component({
  selector: 'tr[app-tr]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent {}
