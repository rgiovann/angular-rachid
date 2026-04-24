import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventBlur]',
  standalone: true,
})
export class PreventBlurDirective {
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
  }
}
