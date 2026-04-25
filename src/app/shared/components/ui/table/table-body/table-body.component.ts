import { Component } from '@angular/core';

@Component({
  selector: 'tbody[app-tbody]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-body.component.scss'],
})
export class TableBodyComponent {}
