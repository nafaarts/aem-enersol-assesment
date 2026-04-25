import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent {
  private static counter = 0;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() id = `app-input-password-${++InputPasswordComponent.counter}`;
  @Input() control: FormControl = new FormControl();

  showPassword = false;

  toggle(): void {
    this.showPassword = !this.showPassword;
  }
}
