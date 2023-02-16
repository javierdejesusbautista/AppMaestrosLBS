import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

  estadoModal = false;
  displayModal = 'none';
  libroActual: any = {};
  secuenciasLibroActual: any = {};
  pagina: any;
  public paginaSubejct$: Subject<any> = new Subject<any>();


  locations = new Observable((pagina) => {
   
    window.addEventListener('message', (event)=>{
      pagina.next(event.data);
    }, false)
    
  });


  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
    this.displayModal = 'none' ? 'inherit' : 'none'
  }
  cambiarPaginaSubejct(pagina: any) {
    console.log(pagina);
    this.paginaSubejct$.next(pagina);
  }


  constructor() { 

	this.paginaSubejct$.subscribe((value) => {
		this.pagina = value
	});

  }


   
}