import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.scss'] 
})

export class menuComponent   {
    constructor() { }

    isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
  
}