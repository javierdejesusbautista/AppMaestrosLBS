import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

	estadoModal = false;
	displayModal = 'none';
	libroActual: any = {};
	totalPaginas: number = 0;

	secuenciasLibroActual: any = {};
	pagina: any;
  	public paginaSubejct$: Subject<any> = new Subject<any>();
	public nombreLibroActual$: Subject<string> = new Subject<string>();
	public stateIframe$: Subject<boolean> = new Subject<boolean>();
	public addSecuencia$: Subject<any> = new Subject<any>();
	public getSecuencias$: Subject<any> = new Subject<any>();
  
	nombreLibro: string;
	stateIframe = false;

	currentIframe: any;

  locations = new Observable((pagina: any) => {
    window.addEventListener('message', (event)=>{

		const dataGeneral = {
			type: event.data.totalPaginas ? 'totalPaginas' : 'pagina',
			data: {
			  [event.data.totalPaginas ? 'totalPaginas' : 'pagina']: event.data
			}
		  };
		  pagina.next(dataGeneral);
		
    }, false);
	
});
    

  

  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
    this.displayModal = 'none' ? 'inherit' : 'none'
  }
  cambiarPaginaSubejct(pagina: any) {
    this.paginaSubejct$.next(pagina);
  }

  setNombreLibroActual(nombre: string) {
	this.nombreLibroActual$.next(nombre);
  }	

  setStateIframe(state: boolean) {
	this.stateIframe$.next(state);
  }

  addSecuencia(data: any) {
	this.addSecuencia$.next(data);
  }

  getSecuencias(data: any) {
	this.getSecuencias$.next(data);
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