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


  navigateToLibros(){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.rutaActual$.next('/home/libros');
    this.router.navigate(['/home/libros']);
  }
  navigateToSecuencias(){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.rutaActual$.next('/home/secuencias');
    this.router.navigate(['/home/secuencias']);
  }
  navigateToEstadisticas(){
    this.dataService.reiniciarNombreLibro('');
    this.dataService.rutaActual$.next('/home/estadisticas');
    this.router.navigate(['/home/estadisticas']);
  }

}