import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import Quill from 'quill';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { db } from '../db/db';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.page.html',
  styleUrls: ['./secuencias.page.scss'],
})
export class SecuenciasPage implements OnInit {

  	libros:any ;
	secuenciasIsLoading: boolean = false;
	secuencia: any = [];

	modalVerSecuencia = false;
	isEditarActivo = false;

	frmContenido: FormControl;
		
	/*+
	* Configuracion para quill eitor
	*/	
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

  constructor(private domSanitizer: DomSanitizer, 
	private alertController: AlertController, 
	private formBuilder: FormBuilder,
	private libroService: LibroService) {
		this.frmContenido = this.frmContenido ?? new FormControl();
   }

   	ngOnInit() {
   		this.secuenciasIsLoading = true;
		this.getDataSecuencia();
  	}

  clickDownloadJSON(){
    db.table("secuenciaLists").toArray().then(secuenciaLists => {
      var data1 = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(secuenciaLists));
      var a = document.createElement('a');
      a.href = 'data:' + data1;
      //a.download = nombrePDF.slice(0, -4) +'.json';
      a.innerHTML = 'download JSON';
      a.id='descargarJsonBd'

      var container = document.getElementById('linkDescargarBaseDatos');
      //container.appendChild(a);
      //document.getElementById('descargarJsonBd').click();
    });
  }


  /**
   * Get data de las secuencias guardadas en decieDB (stogare)
   */
  async getDataSecuencia() {
	this.libroService.getLibrosSecuencias().subscribe(res => {
		this.libros = res;
		this.secuenciasIsLoading = false;
		console.log(this.libros);
	});
  }

  /**
   * Delete la secuencia seleccionada, crea un alert, para despues recargar los datos.
   */
  async borrarSecuencia(idSecuencia: string, idLibro: string) {
	console.log(idSecuencia, idLibro);
	const alert = await this.alertController.create({
		subHeader: '¿Desea borrar la secuencia?',
		buttons: [
		  {
			text: 'Cancelar',
			role: 'cancel',
			handler: () => {
			},
		  },
		  {
			text: 'Aceptar',
			role: 'confirm',
			handler: async () => {
				this.secuenciasIsLoading = true;
				this.libroService.deleteSecuenciaLibro(idLibro, idSecuencia).subscribe( (res) => {
					this.secuenciasIsLoading = false;
					this.getDataSecuencia();
				});
			},
		  },
		],
	  });
  
	  await alert.present();
}

  /**
   * Boton ver secuencia, abre el moddal
   */	
  verSecuencia(secuencia: any, idLibro?: string) {
	this.secuencia = secuencia;
	this.secuencia.idLibro = idLibro;
	console.log(this.secuencia);
	this.modalState();
  }

  /**
   * 
   * cambia el modal a el formulario quill editor para editar.
   */
  editarSecuencia() {
	this.secuenciaEditarState();
	this.frmContenido.setValue(this.secuencia.contenido);
  }

  
  /**
   * @param secuenciaId number - Id de la secuencia a editar 
   * Boton guardar, editar secuencia, crea un alert para despues recargar los datos si se edito.
   */
  async guardarEdited(secuenciaId: string, idLibro: string) {
	const alert = await this.alertController.create({
		subHeader: '¿Desea modificar la secuencia?',
		buttons: [
		  {
			text: 'Cancelar',
			role: 'cancel',
			handler: () => {
			},
		  },
		  {
			text: 'Aceptar',
			role: 'confirm',
			handler: async () => {
				this.secuenciasIsLoading = true;
				this.libroService.editSecuenciaLibro(secuenciaId, idLibro, this.frmContenido.getRawValue()).subscribe(data => { 
					if(this.modalVerSecuencia === true) {
						this.modalVerSecuencia = false;
					}
					this.secuenciaEditarState();
					this.getDataSecuencia();
					
				});
			
			},
		  },
		],
	  });
  
	  await alert.present();


  }

  /**
   * @param contenido string html - contenido html de la secuencia 
   * @returns cotenido html de la secuencia para poder ver correctamente las etiquetas. 
   */
  contenidoSanitized(contenido: any) {
	return this.domSanitizer.bypassSecurityTrustHtml(contenido);
  }


  /**
   * cambia el estado del modal
   * true - on
   * false - off
   */
  modalState() {
	this.modalVerSecuencia = !this.modalVerSecuencia;
  }

  secuenciaEditarState() {
	this.isEditarActivo = !this.isEditarActivo;
  }


  	testFunction() {
		console.log('test', this.libros);

		const groupedArray = this.libros.reduce((acc: { [x: string]: any[]; }, curr: { idLibro: any; }) => {
			const idLibro = curr.idLibro;
			if (!acc[idLibro]) {
			  acc[idLibro] = [];
			}
			acc[idLibro].push(curr);
			return acc;
		  }, {});
		
		  
		  console.log('groupedArray', groupedArray);
	}
}
