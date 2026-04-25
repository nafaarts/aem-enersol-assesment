import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  private static counter = 0;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';
  @Input() id = `app-input-${++InputComponent.counter}`;
  @Input() control: FormControl = new FormControl();
}
