import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  renderer : Renderer2;
  elRef : ElementRef;
  open : boolean = false;

  constructor(elRef: ElementRef, renderer: Renderer2) { 
    this.renderer = renderer;
    this.elRef = elRef;
  }

  @HostListener('click') mouseclick(eventData: Event) {
    if(this.open) {
      this.renderer.removeClass(this.elRef.nativeElement,'open');
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    }
    this.open = !this.open;
  }
 
}
