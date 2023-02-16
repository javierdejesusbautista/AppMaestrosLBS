import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

import { LibrosService } from '../../API/libros.service';
import { DataService } from '../../services/data.service';

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
	@ViewChild('iframe') iframe: ElementRef;
  
	constructor( 
	  public dataService: DataService,
	  private librosService: LibrosService,
	) {}

	ngOnInit() {    
		this.librosTemp = this.librosService.peticionLibros();
	
		//Agrupo los libros por grado
		const grades = ['1', '2', '3', '4', '5', '6'];
		const gradeNames = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
	
		this.librosAll = grades.reduce((acc: any[], grade, index) => {
			const libros = this.librosTemp.filter(libro => libro.Grados === grade);
			acc.push({'Grados': gradeNames[index], 'Libros': libros});
			return acc;
		}, []);
		
		this.dataService.paginaSubejct$.subscribe(value => {
			console.log(value);
		});
		

	  }
	
	  url(){
		console.log('iframe',this.iframe.nativeElement.contentWindow.location.href);
	  }
	
	  abrirLibro(libro: any){
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
