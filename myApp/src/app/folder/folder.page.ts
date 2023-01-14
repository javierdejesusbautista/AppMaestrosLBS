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
  libros: any[] = [];
  @ViewChild('iframe') iframe: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public dataService: DataService,
    private librosService: LibrosService,
  ) {}

  ngOnInit() {    
    this.libros = this.librosService.peticionLibros();
  }

  url(){
    console.log('iframe',this.iframe.nativeElement.contentWindow.location.href);
  }

  acordeonStatus(){
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

