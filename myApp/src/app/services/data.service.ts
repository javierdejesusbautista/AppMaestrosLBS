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

	private observerHome: any;
	private observerFolder: any;

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
		console.log(event);

		const dataFromIndex = { 
			type: event.data.type,
			args: event.data.arguments
		}
		console.log("window listener message: ", dataFromIndex);

		this.observerFolder.next(dataFromIndex);
	}

	receiveMessageHome = (event: any) => { 
		console.log(event);

		const dataFromIndex = { 
			type: event.data.type,
			args: event.data.arguments
		}
		console.log("window listener message: ", dataFromIndex);

		this.observerHome.next(dataFromIndex);
	}

	








/*

	
	locations = new Observable((pagina: any) => { 
		// this.pagina = pagina;
		console.log("pagina", pagina);
		window.addEventListener('message', this.receiveMessage, false); 

		
	});
	
    
		receiveMessage = (event: any)  => {
			console.log(event);
			const dataFromIndex = {
				type: event.data.type,
				args: event.data.arguments
			}
			console.log("window listener message: ", dataFromIndex);
			event.next(dataFromIndex);
		}
  
	*/

	// 	const dataFromIndex = {
		// 		type: event.data.type,
		// 		args: event.data.arguments
		// 	}; 
		// 	console.log(dataFromIndex);
		// 	pagina.next(dataFromIndex);
		// }, false);
	

  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
    this.displayModal = 'none' ? 'inherit' : 'none'
  }

  abrirModalMain() {
	  this.estadoModalMain = this.estadoModalMain ? false : true;
	//   console.log(this.estadoModalMain);
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