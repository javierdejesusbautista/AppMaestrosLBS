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
	acordeonEstado = true;
	iframeEstado = false;
	librosTemp: any[] = [];
	librosAll: any[] = [];

	urlLibro: any;

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
		//this.librosTemp = this.librosService.peticionLibros();

		this.librosService.getTodosLosLibros().subscribe(libros => {
			console.log(libros);
			this.librosTemp = libros;
			//Agrupo los libros por grado
			const grades = ['1', '2', '3', '4', '5', '6'];
			const gradeNames = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
		
			this.librosAll = grades.reduce((acc: any[], grade, index) => {
				const libros = this.librosTemp.filter(libro => libro.Grados === grade);
				acc.push({'Grados': gradeNames[index], 'Libros': libros});
				return acc;
			}, []);

			console.log(this.librosAll);
		});
	

		this.dataService.paginaSubejct$.subscribe(value => {
			console.log(value)
			this.message = {
				type: 'callFunction',
				functionName: 'nombreDeTuFuncion',
				arguments: [value]
			};
			this.iframe.nativeElement.contentWindow.postMessage( this.message , '*');
		});
	  }
	
	//   url(){
	// 	console.log('iframe',this.iframe.nativeElement.contentWindow.location.href);
	//   }
	
	  abrirLibro(libro: any){
		const mainUrl: string = 'https://desktop.alfalbs.app/books/';
		let urlTemp = `${mainUrl}${libro.NombreArchivo}/indexAndroid.html`;
		 this.urlLibro = this.domSanitizer.bypassSecurityTrustResourceUrl(urlTemp);

		console.log('abrirLibro', libro);
		this.dataService.libroActual = libro;
	
		// accion abrir ifrime con link real libro
	
		this.acordeonEstado = false;
		this.iframeEstado = true;
		this.botonesEstado = true;
	  }
	
	  regresar(){
		this.acordeonEstado = true;
		this.iframeEstado = false;
		this.botonesEstado = false;
	  }
	
	  crearZip(){
		var zip = new JSZip();
		zip.file("ejemplo.js", "Hola Josias y bienvenido a JSZIP\n");
		zip.generateAsync({ type: "blob" }).then(function (content) {
		  FileSaver.saveAs(content, "Example.zip");
		});
	  }	

}
