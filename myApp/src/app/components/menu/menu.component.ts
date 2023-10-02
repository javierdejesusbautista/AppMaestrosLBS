import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls:['./menu.component.scss'] 
})

export class menuComponent   {
    constructor(
      private dataService: DataService,
      private router: Router,
      ) { }

    isMenuOpen = false;
     
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }

  navigateToLibros(){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.rutaActual$.next('/home/libros');
    this.router.navigate(['/home/libros']);
  }
  navigateToEstadisticas(){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.rutaActual$.next('/home/estadisticas');
    this.router.navigate(['/home/estadisticas']);
  }

}