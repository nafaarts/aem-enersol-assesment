import { Component } from '@angular/core';

@Component({
  selector: 'thead[app-thead]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-head.component.scss'],
})
export class TableHeadComponent {}
