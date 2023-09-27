import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { db } from '../../db/db';
import { LibroService } from '../../services/libro.service';
import { DataService } from 'src/app/services/data.service';
import { SecuenciasFsService } from 'src/app/services/secuencias-fs.service';
import { ToastService } from 'src/app/services/toast.service';

import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.component.html',
  styleUrls: ['./secuencias.component.scss'],
})
export class SecuenciasComponent implements OnInit {

	skeleton: any[] = [100, 85, 100, 85, 100];
	libros:any ;
	secuenciasIsLoading: boolean = false;
	secuenciasLibroLoading: boolean = false;
	noHaySecuencias: boolean = false;
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
			]
		};


		
	@ViewChild("quillVerSecuencia", {read: ElementRef}) quillVerSecuencia: ElementRef;

	constructor(private domSanitizer: DomSanitizer, 
		private alertController: AlertController,
		private secuenciasService: SecuenciasFsService,
		public toastService: ToastService, private renderer: Renderer2) {
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

		this.secuenciasService.getLibrosCollectionCloudFunction().subscribe( (data: any) => {
			this.librosData = data.librosColelction;
			this.secuenciasIsLoading = false;
		});


		// this.secuenciasService.getLibrosSecuencias().subscribe(data => {
		// 	data.forEach((doc, index) => {
		// 		this.librosData[index] = doc.payload.doc.data();
		// 		this.librosData[index]['claveLibro'] = doc.payload.doc.id;
		// 	});
			
		// 	setTimeout(() => {
		// 		this.secuenciasIsLoading = false;
		// 	}, 400);
			
		// });
	}

	/**
	* Delete la secuencia seleccionada, crea un alert, para despues recargar los datos.
	*/
	async borrarSecuencia(secuencia: any, claveLibro: string) {
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
					this.secuenciasService.deleteSecuenciaLibro(claveLibro, secuencia).then( (res) => {
						this.toastService.show('Se elimino la secuencia didactica.', { classname: 'bg-danger text-light', delay: 2500 });
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
		this.secuencia = libro;
		this.secuenciaClaveLibro = claveLibro;
		this.frmContenido.setValue(this.secuencia.data);
		this.modalState();
		
		//Si no se pone el timeout no le da tiempo a la variable de formarse. dont ask why
		setTimeout(() => {
			this.renderer.listen(this.quillVerSecuencia.nativeElement, 'drop', (event) => {
				event.preventDefault();
			});
	
			this.renderer.listen(this.quillVerSecuencia.nativeElement, 'paste', (event: ClipboardEvent) => {
				setTimeout(() => {
					const regex = /<img\b[^>]*>/g;
					let contenido = this.frmContenido.getRawValue();
					let imgsDeleted: any;
					imgsDeleted = contenido.replace(regex, '');
					this.frmContenido.setValue(imgsDeleted); 
				 }, 50);
			});
		}, 50);
	}


	/**
	* @param secuenciaId number - Id de la secuencia a editar 
	* Boton guardar, editar secuencia, crea un alert para despues recargar los datos si se edito.
	*/
	async guardarEdited(libro: any) {

		
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
						this.toastService.show('Cambios realizados.', { classname: 'bg-info text-light', delay: 2500 });
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

	onClickGetSecuencias(claveLibro: any) {
		this.secuenciasLibro = [];
		this.secuenciasLibroLoading = true;

		this.secuenciasService.getSecuecias(claveLibro).subscribe(data => {
			this.secuenciasLibro = data.map(doc => doc.payload.doc.data())
			.filter((secuencia: any) => secuencia.elemento.includes('sd_'))
			.sort( (a: any, b:any) => {return a.pagina - b.pagina });
			
			
			
			setTimeout(() => {
				this.secuenciasLibroLoading = false
				if(this.secuenciasLibro.length === 0) this.noHaySecuencias = true;
				else this.noHaySecuencias = false;
			}, 400);
		});
		
	}


	ngOnDestroy() {
		this.secuenciasIsLoading = true;
		this.librosData = [];
	}
	

}
