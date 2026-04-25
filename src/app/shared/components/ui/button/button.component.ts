import { Component, Input, OnInit } from '@angular/core';

type ButtonMode = 'default' | 'clear' | 'hollow'
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'alert' | 'warning'
type ButtonSize = 'tiny' | 'small' | 'default' | 'large' | 'expanded' | 'small_expanded'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() mode: ButtonMode = 'default'
  @Input() variant: ButtonVariant = 'primary'
  @Input() size: ButtonSize = 'default'
  @Input() disabled: boolean = false;

  get classes(): string {
    return [
      this.modeClasses,
      'button',
      this.variant,
      this.sizeClasses
    ].join(' ')
  }

  get modeClasses(): string {
    if (this.mode === 'default') {
      return ''
    }

    return this.mode
  }

  get sizeClasses(): string {
    if (this.size === 'default') {
      return ''
    }

    return this.size
  }

}

