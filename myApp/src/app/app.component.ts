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

	contenidoSecuencia = ''
	pag = 0;
	numeroPagina$ : any;
	totalPaginas : any[] = [];
	presentingElement : any;

	quillModules = {
		'toolbar': [
			['bold', 'italic', 'underline', 'strike'],	// toggled buttons
			['blockquote', 'code-block'],
			[{'header': 1}, {'header': 2}],
			[{ 'size': ['small', false, 'large', 'huge'] }],	// custom button values
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
							// text direction
				// custom dropdown
			[{ 'color': [] }, { 'background': [] }],	// dropdown with defaults from theme
			[{ 'align': [] }],

			['link', 'image', 'video'],	// link and image, video
		]
	};
  
  
  public appPages = [
    { title: 'Libros', url: '/libros/Libro', icon: 'book' },
    { title: 'Secuencias', url: '/secuencias/Secuencia', icon: 'bookmarks' },
  ];
  
  public labels = ['Family', 'Friends', 'Notes'];


  @ViewChild('#modal') modalSecuencia: ElementRef;

  constructor( 
    public dataService: DataService,
  ) { }

  ngOnInit(){   
    this.dataService.locations.subscribe(pagina =>{
      this.numeroPagina$ = pagina;
	 this.pag = parseInt(this.numeroPagina$);
    });
    for (let index = 1; index < 142; index++) {
        this.totalPaginas.push(index);
    }
    this.presentingElement = document.querySelector('.ion-page');
  }

  async addNewList() {
	if(this.contenidoSecuencia.length < 1) return;

	console.log(this.dataService.libroActual);
    await db.secuenciaLists.add({
		contenido : this.contenidoSecuencia,
		numPagina : this.pag,
		// libroNombre: "nombre",
		// NombreArchivo: "nombreArchivo",
		// Grados: "grados",
		// Escolaridad: "escolaridad",
		// idLibro: "idlibro"
	  libroNombre: this.dataService.libroActual.Nombre,
	  Grados: this.dataService.libroActual.Grados,
	  Escolaridad: this.dataService.libroActual.Escolaridad,
	  NombreArchivo: this.dataService.libroActual.NombreArchivo,
	  idLibro: this.dataService.libroActual.Id
    });
    this.dataService.abrirModal();
  }

  onChangePag(event: any) {
	console.log(event);
  }
}

