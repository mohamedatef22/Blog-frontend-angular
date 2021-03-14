import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appChars]',
})
export class CharsDirective {
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.key == ' ' || !isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }
  constructor(private elRef: ElementRef) {}
}
