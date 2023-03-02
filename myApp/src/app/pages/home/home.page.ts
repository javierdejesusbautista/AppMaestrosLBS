import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   
	contenidoSecuencia = ''
	formContenidoSecuencia: FormControl = new FormControl();
	pag = 1;
	numeroPagina$ : any;
	totalPaginas : any[] = [];
	selectAcciones: string = '';
	stateBotonGuardarEditarSecuencia: boolean = false;

	nombreLibro: string = '';

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
  
	datosGenUsuario: any = {};
//   public appPages = [
//     { title: 'Libros', url: '/libros/Libro', icon: 'book' },
//     { title: 'Secuencias', url: '/secuencias/Secuencia', icon: 'bookmarks' },
//   ];
  
   appPages = [
    { title: 'Libros', icon: 'book-outline', tipo: 'libros', activo: true },
    { title: 'Secuencias', icon: 'document-text-outline', tipo: 'secuencias', activo: false },

  ];
  
  public labels = ['Family', 'Friends', 'Notes'];

  libroExiste: any;

  @ViewChild('#modal') modalSecuencia: ElementRef;
  @ViewChild('select') select: ElementRef;


  constructor(public dataService: DataService,
	private authService: AuthService,
	private alertController: AlertController) { }

	ngOnInit() {   	
		
		this.datosGenUsuario['iniciales'] = this.getTokenData('nombre').substring(0, 2);
		this.datosGenUsuario['nombre'] = this.getTokenData('nombre');
		
		this.dataService.locations.subscribe((paginaData: any) =>{
			console.log(paginaData); 
			//const { data, secuencia } = paginaData;
			const { type, data } = paginaData;

			if(type === 'pagina') {
				this.pag = parseInt(data.pagina.pagina);
				if(this.dataService.estadoModal) {
					this.stateBotonGuardarEditarSecuencia = false;
					this.formContenidoSecuencia.setValue('');
	
					if(data.pagina.secuencia !== undefined) {
						this.formContenidoSecuencia.setValue(data.pagina.secuencia['data']);
						this.stateBotonGuardarEditarSecuencia = true;
					}
				}
			}
			if (type === 'totalPaginas') {
				const totalPaginasLibro = data.totalPaginas.totalPaginas;
				
				for (let index = 1; index < totalPaginasLibro; index++) {
					this.totalPaginas.push(index);
				}
			}


		});

		this.dataService.nombreLibroActual$.subscribe(nombre => this.nombreLibro = nombre);

		
		
	}

	async addNewSecuencia() {
		const contenidoSecuencia = this.formContenidoSecuencia.getRawValue();
		if(contenidoSecuencia === null) return;
		const { Id, Nombre } = this.dataService.libroActual;

		 const sendDadaLibro = {
			type: 'addSecuencia',
			functionName: 'addSecuencia',
			arguments: {
				data: this.formContenidoSecuencia.getRawValue(),
				ejercicio: 0,
				elemento: `sd_${this.pag}`,
				libroid: Id,
				nombreLibro: Nombre,
				pagina: this.pag
			}
		 }
		 console.log(sendDadaLibro);

		this.dataService.abrirModal();
	  }

	  async guardarSecuencia() {
		const contenidoSecuencia = this.formContenidoSecuencia.getRawValue();
		if(contenidoSecuencia === null) return;
		const alert = await this.alertController.create({
			subHeader: '¿Guardar cambios?',
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

					const sendDadaLibro = {
						type: 'addSecuencia',
						functionName: 'addSecuencia',
						arguments: {
							data: contenidoSecuencia,
							ejercicio: 0,
							elemento: `sd_${this.pag}`,
							libroid: 0,
							nombreLibro: this.dataService.libroActual.Nombre,
							pagina: this.pag
						}
					 };
					 console.log(sendDadaLibro);
					 this.dataService.addSecuencia(sendDadaLibro);
				
				},
			},
			],
		});

		await alert.present();
	  }

	onChangePag(event:any) {
		this.dataService.cambiarPaginaSubejct(event);
	}

	
	chosePage(pageTipo: string) {
		this.appPages[0].activo = pageTipo === 'libros';
		this.appPages[1].activo = pageTipo === 'secuencias';
	}

	regresarInicio() {
		console.log("regresar inicio");
		const cerrarIframe  = false;
		this.chosePage('libros');
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe( cerrarIframe );
	}


	selectDropDown(event: any) {
		const opcion = event.detail.value;
		this.selectAcciones = opcion;
		console.log(opcion);
		if(opcion === 'crear-secuencia') this.dataService.abrirModal();
		if(opcion === 'descargar-zip') console.log("descargar-zip");
		if(opcion === 'otros') console.log("otros");

		console.log(this.selectAcciones);
	}

	cleanSelectDropDown() {
		this.selectAcciones = '';
	}

	onLogout() {
		this.authService.logout();
	}

	getTokenData(key: string) {
		const jwt = localStorage.getItem('USER_INFO');
	
		const jwtData = jwt!.split('.')[1];
		// let decodedJwtJsonData = window.atob(jwtData);
		const decodedJwtJsonData = decodeURIComponent(escape(window.atob(jwtData)));
		const decodedJwtData = JSON.parse(decodedJwtJsonData);
	
		const value = decodedJwtData[key];
	
		return value;
	}

}
