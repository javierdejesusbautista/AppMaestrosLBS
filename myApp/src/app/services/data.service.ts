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
	public nombreLibroActual$: Subject<string> = new Subject<string>();
	public stateIframe$: Subject<boolean> = new Subject<boolean>();
  
	nombreLibro: string;
	stateIframe = false;

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

  setNombreLibroActual(nombre: string) {
	this.nombreLibroActual$.next(nombre);
  }	

  setStateIframe(state: boolean) {
	console.log("state: ", state);
	this.stateIframe$.next(state);
  }


  constructor() { 

	this.paginaSubejct$.subscribe((value) => {
		this.pagina = value
	});


	this.nombreLibroActual$.subscribe((nombre) => {
		this.nombreLibro = nombre;
	});
	
	this.stateIframe$.subscribe((state) => {
		this.stateIframe = state;
	});
  }


   
}