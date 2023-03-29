import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

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
	totalPaginas : number[] = [];
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
	public toastService: ToastService) { }

	ngOnInit() {
		this.dataService.locations.subscribe((dataReceived: any) => {
			const { type, args } = dataReceived;
			
			if(type === 'pagina') {
				this.pag = parseInt(args.pagina);
				if(this.dataService.estadoModal) {
					this.stateBotonGuardarEditarSecuencia = false;
					this.formContenidoSecuencia.setValue('');
	
					if(args.secuencia !== undefined) {
						this.formContenidoSecuencia.setValue(args.secuencia['data']);
						this.stateBotonGuardarEditarSecuencia = true;
					}
				}
			}
			if (type === 'totalPaginas') {
				for (let index = 1; index <= args; index++) {
					this.totalPaginas.push(index);
				}
			}
		});

		this.dataService.nombreLibroActual$.subscribe(nombre => this.nombreLibro = nombre);
	}

	ionViewWillEnter() { 
		this.appPages[0].activo = true;
		this.datosGenUsuario['iniciales'] = this.getTokenData('nombre').substring(0, 2);
		this.datosGenUsuario['nombre'] = this.getTokenData('nombre');

	}


	  async guardarSecuencia() {
		const contenidoSecuencia = this.formContenidoSecuencia.getRawValue();

		if(contenidoSecuencia === null) {
			this.toastService.show('Las secuencias didacticas no pueden ir sin texto.', { classname: 'bg-warning text-dark', delay: 3000 });
			return;
		} 
			

		const sendDataLibro = {
			type: 'addSecuencia',
			functionName: 'addSecuencia',
			arguments: {
				data: contenidoSecuencia,
				ejercicio: 0,
				elemento: `sd_${this.pag}`,
				libroid: 0,
				pagina: this.pag,
				userCreate: this.getTokenData('usuario')
			}
		 };
		 
		 this.dataService.addSecuencia(sendDataLibro);

		 this.toastService.show('Secuencia didactica guardada.', { classname: 'bg-success text-light', delay: 3000 });


	  }

	onChangePag(event:any) {
		this.dataService.cambiarPaginaSubejct(event);
	}

	
	chosePage(pageTipo: string) {
		this.nombreLibro = '';
		this.dataService.estadoModal = false;
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe(false);
		this.appPages[0].activo = pageTipo === 'libros';
		this.appPages[1].activo = pageTipo === 'secuencias';
	}

	regresarInicio() {
		console.log("regresar inicio");
		const cerrarIframe  = false;
		this.dataService.estadoModal = false;
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
		this.dataService.abrirModal();
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe( false );
		setTimeout(() => {
			this.appPages[0].activo = false;
			this.appPages[1].activo = false;
			this.authService.logout();
		}, 50);
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

	ngOnDestroy() {

	}


}
