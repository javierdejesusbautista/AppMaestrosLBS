import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { db, SecuenciaList } from 'src/app/db/db';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import interact from 'interactjs';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{

  contenido = ''
  pag = 0;
  numeroPagina$ : any;
  totalPaginas : any[] = [];
  presentingElement : any;
  
  public appPages = [
    { title: 'Libros', url: '/libros/Libro', icon: 'book' },
    { title: 'Secuencias', url: '/secuencias/Secuencia', icon: 'bookmarks' },
  ];
  
  public labels = ['Family', 'Friends', 'Notes'];

  constructor( 
    public dataService: DataService,
  ) { }

  ngOnInit(){   
    this.dataService.locations.subscribe(pagina =>{
      this.numeroPagina$ = pagina
    });
    for (let index = 1; index < 142; index++) {
        this.totalPaginas.push(index);
    }
    this.presentingElement = document.querySelector('.ion-page');
  }

  async addNewList() {
    await db.secuenciaLists.add({
      contenido : this.contenido,
      numPagina : this.pag,
    });
    this.dataService.abrirModal();
  }
}

