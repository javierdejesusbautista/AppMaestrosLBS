import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

//import { LibrosService } from '../../API/libros.service';
import { DataService } from '../../services/data.service';
import { LibroService } from 'src/app/services/libro.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

	botonesEstado = false;
	acordeonEstado = false;
	iframeEstado = false;
	librosTemp: any[] = [];
	librosAll: any[] = [];
	librosLoading: boolean;
	paginaActual: number = 1;
	iframeRef: any;

	urlLibro: any;

	fabBtnOpen: boolean = false;
	fabPageNumberClass: string;

	@ViewChild('iframe') iframe: ElementRef;
     message = {
		type: '',
		functionName : '',
		arguments: [0]
	};
  
	constructor( 
	  public dataService: DataService,
	  private librosService: LibroService,
	  private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {    
		console.log("logged ngonint");
		//this.librosTemp = this.librosService.peticionLibros();
		this.acordeonEstado = false;
		this.librosLoading = false;
		this.librosService.getTodosLosLibros().subscribe(libros => {
			console.log(libros);
			this.librosTemp = libros;
			//Agrupo los libros por grado
			const grades = ['1', '2', '3', '4', '5', '6'];
			const gradeNames = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
			
			 this.librosAll = grades.reduce((acc: any[], grade, index) => {
				const libros = this.librosTemp.filter(libro => libro.Grados === grade);
				if(libros.length > 0) {
					acc.push({'Grados': gradeNames[index], 'Libros': libros});
				}
				return acc;
			}, []);

			// this.librosAll = this.librosAll.map(libro =>  if( libro.Libros.length >= 0) return l );
			this.acordeonEstado = true;
			this.librosLoading = true;
			console.log(this.librosAll);
		});


		this.dataService.locations.subscribe((paginaData: any) => { 
			const { type, data } = paginaData;
			if(type === 'pagina') {
				this.paginaActual = parseInt(data.pagina.pagina);
			}
		});

	
		this.dataService.stateIframe$.subscribe((data: boolean) => {
			this.iframeEstado = data;
			this.acordeonEstado = true;
			this.botonesEstado = false;
		 } );
	

		this.dataService.paginaSubejct$.subscribe(value => {
			console.log(value)
			this.message = {
				type: 'callFunction',
				functionName: 'nombreDeTuFuncion',
				arguments: [value]
			};
			this.iframe.nativeElement.contentWindow.postMessage( this.message , '*');
		});


		this.dataService.addSecuencia$.subscribe(data => {
			console.log(data);
			this.iframe.nativeElement.contentWindow.postMessage( data, '*');
		});

		this.dataService.getSecuencias$.subscribe(data => {
			this.iframe.nativeElement.contentWindow.postMessage( data, '*');
		});
	  }
	
	 

	  abrirLibro(libro: any){
		// const mainUrl: string = 'https://desktop.alfalbs.app/books/';
		// let urlTemp = `${mainUrl}${libro.NombreArchivo}/indexAndroid.html`;
		//  this.urlLibro = this.domSanitizer.bypassSecurityTrustResourceUrl(urlTemp);

		console.log('abrirLibro', libro);
		this.librosLoading = true;
		this.dataService.libroActual = libro;
		
		console.log(this.iframe);
		const { Id } = libro;
		
		// accion abrir ifrime con link real libro
		this.dataService.setNombreLibroActual(libro.Nombre);
		this.iframeEstado = true;
		this.acordeonEstado = false;
		this.botonesEstado = true;
		setTimeout(() => {
			this.dataService.currentIframe = this.iframe.nativeElement.contentWindow;
		}, 100);


	  }
	
	  regresar(){
		this.acordeonEstado = true;
		this.dataService.stateIframe = false;
		this.iframeEstado = false;
		this.botonesEstado = false;
		this.dataService.estadoModal = false;
		this.dataService.setNombreLibroActual('');
	  }

	
	  crearZip(){
		var zip = new JSZip();
		zip.file("ejemplo.js", "Hola Josias y bienvenido a JSZIP\n");
		zip.generateAsync({ type: "blob" }).then(function (content) {
		  FileSaver.saveAs(content, "Example.zip");
		});
	  }	


	  openFabsMenuLibro() {
		this.fabBtnOpen = !this.fabBtnOpen;
		this.fabPageNumberClass = this.fabBtnOpen ? 'traslateY-fab-pagina' : '';
	  }

	  onBlurFabMenu(event: any) {
		console.log("onBlurFabMenu", event);
		// this.fabBtnOpen = true;
		this.fabPageNumberClass = '';
	  }

	  /**ACCIONES HACIA EL LIBRO DE FAB BUTTONS */

	  openListaFavoritosYNotas() {
		console.log("openListaFavoritosYNotasY");	
	  }


	  ngOnDestroy() {
		// this.dataService.addSecuencia$.unsubscribe();
		// this.dataService.paginaSubejct$.unsubscribe();
		// this.dataService.stateIframe$.unsubscribe();
	  }

}
