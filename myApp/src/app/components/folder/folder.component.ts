import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
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
	crearNotasActivated: boolean = false;
	crearNotasDesativado: boolean = false;

	urlLibroLocal: any;
	urlLibrodev: any;
	librosLocal: any[] = [ {
			Nombre: 'ESC_01_science_v2',
			ruta: 'assets/'
		}, {
			Nombre: 'ESC_03_matematicas_v2',
			ruta: 'assets/',
		}, {
			Nombre: 'ESC_06_historia_v2',
			ruta: 'assets/',
		}

	];

	@ViewChild('iframe') iframe: ElementRef;
  
	constructor( 
	  public dataService: DataService,
	  private librosService: LibroService,
	  private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this.acordeonEstado = false;
		this.librosLoading = false;

		this.librosService.getTodosLosLibros().subscribe(libros => {
			this.librosTemp = libros;
			console.log(libros)
			//Agrupo los libros por grado
			const grades = ['0', '1', '2', '3', '4', '5', '6'];
			const gradeNames = ['0', '1st', '2nd', '3rd', '4th', '5th', '6th'];
			
			this.librosAll = grades.reduce((acc: any[], grade, index) => {
				const libros = this.librosTemp.filter(libro => libro.Grados === grade);
				if(libros.length > 0) {
					acc.push({'Grados': gradeNames[index], 'Libros': libros});
				}
				return acc;
			}, []);

			console.log(this.librosAll);

			this.acordeonEstado = true;
			this.librosLoading = true;
		});


		this.dataService.locations.subscribe((dataReceived: any) => { 
			const { type, args } = dataReceived;
			if(type === 'pagina') {
				this.paginaActual = parseInt(args.pagina);
			}
			if(type === 'crearNotaActivated') {
				this.crearNotasActivated = true;
			}
			if(type === 'crearNotaDesactivated') {
				this.crearNotasDesativado = true;
				this.crearNotasActivated = false;
				setTimeout(() => {this.crearNotasDesativado = false}, 400);
			}
		});

	
		this.dataService.stateIframe$.subscribe((data: boolean) => {
			this.iframeEstado = data;
			this.acordeonEstado = true;
			this.botonesEstado = false;
		 } );
	

		this.dataService.paginaSubejct$.subscribe(value => {
			console.log(value)
			const message = {
				type: 'callFunction',
				functionName: 'nombreDeTuFuncion',
				arguments: [value]
			};
			this.iframe.nativeElement.contentWindow.postMessage( message , '*');
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
		const mainUrl: string = 'https://teacher.alfalbs.app/books/';
		let urlTemp = `${mainUrl}${libro.NombreArchivo}/index.html`;

		let urlTempdev = `${mainUrl}${libro.NombreArchivo.split("_prueba")[0]}/index.html`;
		
		console.log("url libro", urlTempdev);
		console.log("nombrelibro:",libro.NombreArchivo.split("_prueba")[0] );

		this.urlLibrodev = this.domSanitizer.bypassSecurityTrustResourceUrl(urlTempdev);
		
		console.log('abrirLibro', libro);
		this.librosLoading = true;
		this.dataService.libroActual = libro;
		// const { Id } = libro;
		
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
		this.fabPageNumberClass = '';
		
	  }

	
	  crearZip(){
		var zip = new JSZip();
		zip.file("ejemplo.js", "Hola Josias y bienvenido a JSZIP\n");
		zip.generateAsync({ type: "blob" }).then(function (content) {
		  FileSaver.saveAs(content, "Example.zip");
		});
	  }

	  abrirIndice() {
		const message = {
			type: 'abrirIndice',
			functionName: 'abrirIndice',
			arguments: []
		}
		this.iframe.nativeElement.contentWindow.postMessage( message , '*');
	  }


	  openFabsMenuLibro() {
		this.fabBtnOpen = !this.fabBtnOpen;
		this.fabPageNumberClass = this.fabBtnOpen ? 'traslateY-fab-pagina' : '';
	  }

	  onBlurFabMenu(event: any) {
		// this.fabBtnOpen = true;
		this.fabPageNumberClass = '';
	  }

	  /**ACCIONES HACIA EL LIBRO DE FAB BUTTONS */

	  openListaFavoritosYNotas() {
		const message = {
			type: 'abrirListaNotasYFavoritos',
			functionName: 'abrirListaNotasYFavoritos',
			arguments: []
		};
		this.iframe.nativeElement.contentWindow.postMessage( message , '*');
	  }

	  openActivarNotaDinamica() {
		const message = {
			type: 'ActivarNotaDinamica',
			functionName: 'ActivarNotaDinamica',
			arguments: []
		}
		this.iframe.nativeElement.contentWindow.postMessage( message , '*');
	  }


	  ngOnDestroy() {
		// this.dataService.addSecuencia$.unsubscribe();
		// this.dataService.paginaSubejct$.unsubscribe();
		// this.dataService.stateIframe$.unsubscribe();
	  }

}