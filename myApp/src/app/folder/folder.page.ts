import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @ViewChild('iframe') iframe: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, public dataService: DataService) {}

  ngOnInit() {    
  
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

}
