import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl } from '@angular/forms';

import { db } from '../../db/db';
import { LibroService } from '../../services/libro.service';
import { DataService } from 'src/app/services/data.service';
import { SecuenciasFsService } from 'src/app/services/secuencias-fs.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.component.html',
  styleUrls: ['./secuencias.component.scss'],
})
export class SecuenciasComponent implements OnInit {

	libros:any ;
	secuenciasIsLoading: boolean = false;
	secuenciasLibroLoading: boolean = false;
	secuencia: any = [];
	secuenciaClaveLibro: string;

	modalVerSecuencia = false;
	isEditarActivo = false;

	librosData: any = [];
	secuenciasLibro: any = [];

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
	private libroService: LibroService,
	private dataService: DataService,
	private secuenciasService: SecuenciasFsService) {
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
		
		this.secuenciasService.getLibrosSecuencias().subscribe(data => {
			
			data.forEach((doc, index) => {
				this.librosData[index] = doc.payload.doc.data();
				this.librosData[index]['claveLibro'] = doc.payload.doc.id;
			});
			console.log(this.librosData);
			this.secuenciasIsLoading = false;
		});
		
		
		// this.libroService.getLibrosSecuencias().subscribe(res => {
		// 	this.libros = res;
		// 	this.secuenciasIsLoading = false;
		// 	console.log(this.libros);
		// });
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
	verSecuencia(libro: any, claveLibro: string) {
		this.secuencia = libro
		this.secuenciaClaveLibro = claveLibro;
		this.frmContenido.setValue(this.secuencia.data);
		console.log(this.secuencia);
		this.modalState();
	}


	/**
	* @param secuenciaId number - Id de la secuencia a editar 
	* Boton guardar, editar secuencia, crea un alert para despues recargar los datos si se edito.
	*/
	async guardarEdited(libro: any) {

		console.log(libro);
		console.log(this.frmContenido.getRawValue());
		console.log(this.secuenciaClaveLibro);
		
		const libroData = { ...libro, 
			data: this.frmContenido.getRawValue() 
		};

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
					this.secuenciasService.editSecuencia(this.secuenciaClaveLibro, libroData).then(data => { 
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

	onClickGetSecuencias(libro: any) {
		this.secuenciasLibro = [];
		this.secuenciasLibroLoading = true;
		console.log(libro);
		this.secuenciasService.getSecuecias(libro.claveLibro).subscribe((data) => {
			data.forEach((doc, index) => {
				this.secuenciasLibro[index] = doc.payload.doc.data();
			});
			setTimeout(() => this.secuenciasLibroLoading = false, 400);
		});
	}

	

}
