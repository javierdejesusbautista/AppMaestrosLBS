import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.scss'] 
})

export class menuComponent   {
    constructor(private dataService: DataService) { }

    isMenuOpen = false;
     
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }

  navigateTo(value: string){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.navigateTo(value);
  }

}