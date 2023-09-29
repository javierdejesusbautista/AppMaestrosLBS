import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

	rutaActual: string = '';

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

	private observerHome: any;
	private observerFolder: any;

	navigateTo(value:string){
		this.rutaActual = value;
	}

	locationsFolder = new Observable((observer) => {
		this.observerFolder = observer;

		window.addEventListener('message', this.receiveMessageFolder, false);

		//cleanup function to unsuscribe from the observable // test 

		// return () => {
		// 	console.log("cleanup function");
		// 	window.removeEventListener('message', this.receiveMessage,);
		// }
	});

	locationsHome = new Observable((observer) => {
		this.observerHome = observer;

		window.addEventListener('message', this.receiveMessageHome, false);

	});

	receiveMessageFolder = (event: any) => { 

		const dataFromIndex = { 
			type: event.data.type,
			args: event.data.arguments
		}

		this.observerFolder.next(dataFromIndex);
	}

	receiveMessageHome = (event: any) => { 

		const dataFromIndex = { 
			type: event.data.type,
			args: event.data.arguments
		}

		this.observerHome.next(dataFromIndex);
	}
	

  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
    this.displayModal = 'none' ? 'inherit' : 'none'
  }

  abrirModalMain() {
	  this.estadoModalMain = this.estadoModalMain ? false : true;
	//   console.log(this.estadoModalMain);
	  this.displayModalMain = 'none' ? 'inherit' : ' none';
	  
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

	//   Nuevas Funciones
	reiniciarNombreLibro(value: string){
		this.nombreLibroActual$.next(value);
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