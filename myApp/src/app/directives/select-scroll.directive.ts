import { Directive, HostListener } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Directive({
  selector: '[appSelectScroll]'
})

export class SelectScrollDirective {

  constructor(
    private ionSelect: IonSelect
  ) { }

  @HostListener('click')
  scrollSoon(): void {
    let keBab = '';
    console.log("hostlistener")
    switch (this.ionSelect.interface) {
      case 'alert': keBab = 'Alert'; break;
      case 'action-sheet': keBab = 'ActionSheet'; break;
      case 'popover': keBab = 'Popover'; break;
    }

    if (keBab) {
      window.addEventListener(
        `ion${keBab}DidPresent`,
        e => { console.log("windowaddevenlistener")
          const parent: Element = <any>e.target;
          const scrollTarget = keBab === 'ActionSheet'
              ? parent.querySelector('.action-sheet-selected')
              : parent.querySelector('[aria-checked=true]')?.closest('.select-interface-option');
          if (scrollTarget) {
            console.log("if")
            console.log(scrollTarget)
            setTimeout(() => {
              scrollTarget.scrollIntoView({behavior: "smooth",block: "center"});
            }, );
            
          }
        },
        {once: true}
      );
    }
  }

}
