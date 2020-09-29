/**
 * @description  https://angular.cn/guide/attribute-directives
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor (private el: ElementRef) {
  }

  @Input() defaultColor: string;

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter () {
    console.log(this.highlightColor);
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave () {
    this.highlight(null);
  }

  @HostListener('click', ['$event.target']) onClick () {
    console.log(this);
    this.highlight('skyblue');
  }

  private highlight (color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
