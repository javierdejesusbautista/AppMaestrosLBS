import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

	estadoModal = false;
	displayModal = 'none';

	estadoModalMain = false;
	displayModalMain = 'none';

	libroActual: any = {};
	totalPaginas: number = 0;

	valueProyecto: string;
	paginaActualProyecto: string | number;
	nomenclaturaProyecto: string;
	secuenciasLibroActual: any = {};
	pagina: any;

  	public paginaSubejct$: Subject<any> = new Subject<any>();
	public nombreLibroActual$: Subject<string> = new Subject<string>();
	public stateIframe$: Subject<boolean> = new Subject<boolean>();
	public addSecuencia$: Subject<any> = new Subject<any>();
	public addRequerimiento$: Subject<any> = new Subject<any>();
	public getSecuencias$: Subject<any> = new Subject<any>();
	public deleteSecuencia$: Subject<any> = new Subject<any>();
  
	nombreLibro: string;
	stateIframe = false;

	currentIframe: any;

	locations = new Observable((pagina: any) => {
		window.addEventListener('message', (event)=>{
			const dataFromIndex = {
				type: event.data.type,
				args: event.data.arguments
			}; 
			console.log(dataFromIndex);
			pagina.next(dataFromIndex);
		}, false);
	});
    

  

  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
    this.displayModal = 'none' ? 'inherit' : 'none'
  }

  abrirModalMain() {
	  this.estadoModalMain = this.estadoModalMain ? false : true;
	  this.displayModalMain = 'none' ? 'inherit' : ' none';
	  
	  console.log("Modal main", this.displayModalMain);
  }
  cambiarPaginaSubejct(pagina: any) {
    this.paginaSubejct$.next(pagina);
  }

  setNombreLibroActual(nombre: string) {
	this.nombreLibroActual$.next(nombre);
  }
  
  deleteSecuencia(dataSecuencia: any) {
	this.deleteSecuencia$.next(dataSecuencia);
  }

  setStateIframe(state: boolean) {
	this.stateIframe$.next(state);
  }

  addSecuencia(data: any) {
	this.addSecuencia$.next(data);
  }

  addRequerimiento(data: any) {
	this.addRequerimiento$.next(data);
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