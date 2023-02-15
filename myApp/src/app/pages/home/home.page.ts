import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { LibroService } from '../../services/libro.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
  
  
//   public appPages = [
//     { title: 'Libros', url: '/libros/Libro', icon: 'book' },
//     { title: 'Secuencias', url: '/secuencias/Secuencia', icon: 'bookmarks' },
//   ];
  
   appPages = [
    { title: 'Libros', icon: 'book', tipo: 'libros', activo: true },
    { title: 'Secuencias', icon: 'bookmarks', tipo: 'secuencias', activo: false },
  ];
  
  public labels = ['Family', 'Friends', 'Notes'];

  libroExiste: any;

  @ViewChild('#modal') modalSecuencia: ElementRef;


  constructor( public dataService: DataService,
	private libroService: LibroService ) { }

	ngOnInit() {   
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
		const idLibro = this.dataService.libroActual.Id;
		//Si libro existe, solo agregar secuencia, sino agregar informacion del libro y secuencia
		this.libroService.getLibroExiste(idLibro).subscribe(resp => {
			if(resp) {
				let datosLibro = {
						pagina: this.pag,
						contenido: this.contenidoSecuencia
					};
				this.libroService.addSecuenciaLibro(idLibro, datosLibro).subscribe(res => {
					this.contenidoSecuencia = '';
				});
			} else {
				let libro = {
					idLibro: this.dataService.libroActual.Id,
					nombreLibro: this.dataService.libroActual.Nombre,
					Grados: this.dataService.libroActual.Grados,
					Suffix: this.dataService.libroActual.Suffix,
					Escolaridad: this.dataService.libroActual.Escolaridad,
					NombreArchivo: this.dataService.libroActual.NombreArchivo,
				}
				this.libroService.createRegistroLibro(libro).subscribe(res => {
					let secuencias = { 
						pagina: this.pag,
						contenido: this.contenidoSecuencia
					};
					this.libroService.addSecuenciaLibro(idLibro, secuencias).subscribe(res => {
						this.contenidoSecuencia = '';
					});
				 })
			}
		});
	
		this.dataService.abrirModal();
	  }
	
	onChangePag(event: any) {
		console.log(event);
	}

	chosePage(pageTipo: string) {
		console.log("page", pageTipo);
		// if(pageTipo === 'libros') {
		// 	this.appPages[0].activo = true;
		// 	this.appPages[1].activo = false;

		// }else if(pageTipo === 'secuencias') {
		// 	this.appPages[0].activo = false;
		// 	this.appPages[1].activo = true;
		// }

		this.appPages[0].activo = pageTipo === 'libros';
		this.appPages[1].activo = pageTipo === 'secuencias';
	}
	

}
