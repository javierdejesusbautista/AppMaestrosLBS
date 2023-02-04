import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { link } from 'fs';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { LibrosService } from '../API/libros.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit  {
  
  botonesEstado = false;
  acordeonEstado = true;
  iframeEstado = false;
  librosTemp: any[] = [];
  librosAll: any[] = [];
  @ViewChild('iframe') iframe: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, 
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
	console.log(this.librosAll);
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

