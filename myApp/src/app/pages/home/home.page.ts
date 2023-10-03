import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SecuenciasFsService } from 'src/app/services/secuencias-fs.service';

import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';


import { NgxJoditComponent } from 'ngx-jodit';

import { Config } from 'jodit/src/config';

    @Component({
      selector: 'app-home',
      templateUrl: './home.page.html',
      styleUrls: ['./home.page.scss'],
      // changeDetection: ChangeDetectionStrategy.OnPush
    })

    export class HomePage implements OnInit, AfterViewInit {



      handleAfterPaste = event => {
        const data = event.clipboardData?.getData('text/html');

        var modal = document.querySelector('.jodit.jodit-dialog.jodit-dialog_theme_default.jodit-dialog_resizable_true.jodit-dialog_footer_true.jodit-dialog_active_true.jodit-dialog_modal_true.jodit-dialog_fullsize_false');

        let cancelled = false

        const btnTacha = modal?.querySelector('button:not([ref])');
        const btnCancelar = modal?.querySelector('button:not([ref]):not(.jodit-toolbar-button__button)');

        // console.log('modal', modal);
        // console.log('tacha', btnTacha);
        // console.log('cancelar', btnCancelar);

        btnTacha?.addEventListener('click', () => { cancelled = true; });
        btnCancelar?.addEventListener('click', () => { cancelled = true; });

        const callback = (mutationsList: MutationRecord[], observer: MutationObserver) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && !document.contains(modal)) {
              // El div específico se ha eliminado del DOM
              // console.log('El div específico ha sido eliminado del DOM');
              // console.log('cancelled?', cancelled);

              if (!cancelled){
                setTimeout(() => {
                  this.checkImagesFromWord(data);
                }, 50);
              }

              const doc = document.querySelector('.jodit-wysiwyg');
              const elementos = doc?.querySelectorAll('p.MsoNormal');
              console.log('doc', doc);
              console.log('elementos', elementos);

              // Define el patrón de estilo que deseas buscar (margin con valores variables)
              const patronEstilo = /margin:\s*0px 0px (\d+)px (-\d+)px/;

              elementos?.forEach(function(element){

                const estilo = element.getAttribute('style');

                if (estilo) {
                  // Verifica si el atributo "style" coincide con el patrón
                  const coincidencia = estilo.match(patronEstilo);

                  if (coincidencia) {
                    // Obtiene los valores variables del margen y del cuarto atributo
                    const valorDelMargen = coincidencia[1];
                    const valorCuartoAtributo = coincidencia[2];

                    // Reemplaza el estilo original eliminando los valores variables
                    const nuevoEstilo = estilo.replace(
                      patronEstilo,
                      `margin: 0px 0px ${valorDelMargen}px;`
                    );

                    // Actualiza el atributo "style" del elemento con el nuevo estilo
                    element.setAttribute('style', nuevoEstilo);
                    console.log(`Elemento con estilo margin: 0px 0px ${valorDelMargen}px ${valorCuartoAtributo}px; :`, element);

                  }
                }

                // }
              });



              observer.disconnect();
              break;
              // Detén la observación si es necesario
            }
          }
        };

        // Crea una instancia de MutationObserver con la función de devolución de llamada
        const observer = new MutationObserver(callback);
        // Configura las opciones de observación (puedes ajustarlas según tus necesidades)
        const config = { childList: true, subtree: true };
        // Comienza a observar cambios en el DOM
        observer.observe(document.body, config);

      }


      handleBeforePaste = event => {
        console.log('handleBeforePaste');
        const items = (event.clipboardData || event.originalEvent.clipboardData)
          .items;
        let hasImage = false;
        console.log('items', items[0].type);
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') === 0) {
            hasImage = true;
            break;
          }
        }
        if (hasImage) {
          console.log('clipboard data');
          this.toastService.show('No se puede adjuntar imágenes.', { classname: 'bg-danger text-light', delay: 3000 });
          return false;
        }
        const data = (
          event.clipboardData || event.originalEvent.clipboardData
        ).getData('text/html');
        if (!data) return;
        const doc = new DOMParser().parseFromString(data, 'text/html');
        const images = doc.querySelectorAll('img');
        console.log('doc', doc);
        console.log('images', images);
        if (!images.length) return;
        console.log('de word data', data);
        this.toastService.show('No se puede adjuntar imágenes.', { classname: 'bg-danger text-light', delay: 3000 });
        return false;
      };
  value = '';
  options: Partial<Config> | undefined = {
    readonly: false, // Define si el editor es de solo lectura
    toolbar: true, //
    toolbarButtonSize: 'small', // Tamaño de los botones en la barra de herramientas ('small', 'default', 'large')
    // buttonsXS: ['bold'], // Tamaño de
    theme: 'default', // Tema del editor ('default', 'dark', 'light')
    statusbar: false, // Tamaño de

    // Configuración de la barra de herramientas
    // buttonsXS: 'bold, italic, underline, strikethrough, superscript, subscript,|, ul, ol',
    buttonsXS: "bold,italic,underline,strikethrough,|,fontsize,paragraph,|,ul,ol,align,brush,undo,redo",
    buttonsSM: "bold,italic,underline,strikethrough,|,fontsize,paragraph,|,ul,ol,align,brush,undo,redo",
    buttonsMD: "bold,italic,underline,strikethrough,|,fontsize,paragraph,|,ul,ol,align,brush,undo,redo",
    buttons:   "bold,italic,underline,strikethrough,|,fontsize,paragraph,|,ul,ol,align,brush,undo,redo",
    enter: 'p',
    height: '500px',
    width: 'auto',
    events: { beforePaste : this.handleBeforePaste, afterPaste: this.handleAfterPaste },
    language: 'es',
    disablePlugins: ' , resize-handler',

  };
	contenidoSecuencia = ''
	formContenidoSecuencia: FormControl = new FormControl();
	formCotenidoProyecto: FormControl = new FormControl();
	pag = 1;
	numeroPagina$ : any;
	totalPaginas : number;
	selectAcciones: string = '';
	stateBotonGuardarEditarSecuencia: boolean = false;

	selectLeccion: any;

	secuenciaActualData: any;
	secuenciaAgregando: boolean = false;
	secuenciaBorrando: boolean = false;

	nombreLibro: string = '';

	rutaActual:string[] = [];

	globalInstance: any;
  editorCreatd:any

	datosGenUsuario: any = {};

   appPages = [
    { title: 'Libros', icon: 'book-outline', tipo: 'libros', activo: true },
    // { title: 'Secuencias', icon: 'document-text-outline', tipo: 'secuencias', activo: false },

  ];

  public labels = ['Family', 'Friends', 'Notes'];

  libroExiste: any;
  hasDataSecuencia: boolean = false;

  @ViewChild('#modal') modalSecuencia: ElementRef;
  @ViewChild('select') select: ElementRef;

  @ViewChild(NgxJoditComponent, {read: ElementRef}) quilleditorSec: ElementRef;

  constructor(public dataService: DataService,
		private authService: AuthService,
		public toastService: ToastService, 
		private elementRef: ElementRef, 
		private renderer: Renderer2,
		private alertController: AlertController, 
		private secuenciasService: SecuenciasFsService,
		private router: Router,
		private zone: NgZone,
	) { }

	ngOnInit() {

		  this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
			  const ruta = event.urlAfterRedirects || '';
			  this.dataService.rutaActual$.next(ruta);
			}
		  });
	  
		  this.dataService.rutaActual$.subscribe((ruta) => {
			let rutaSinguion:string = ruta.replace(/-/g, ' ');
			let rutaArray: string[] = rutaSinguion.split('/');
			this.rutaActual = rutaArray;
		  });

		
		this.dataService.locationsHome.subscribe((dataReceived: any) => {
			const { type, args } = dataReceived;

			if(type === 'pagina') {
				this.stateBotonGuardarEditarSecuencia = false;
				this.pag = parseInt(args.pagina);
				if(args.secuencia !== undefined) {
					this.hasDataSecuencia = true;
					this.secuenciaActualData = args.secuencia;
					this.value = args.secuencia['data'];
					this.stateBotonGuardarEditarSecuencia = true;
				} else {
					this.value = '';
					this.hasDataSecuencia = false;
				}
			}
			if (type === 'totalPaginas') {
				this.totalPaginas = args;
				// console.log(dataReceived);
				// for (let index = 1; index <= args; index++) {
				// 	this.totalPaginas.push(index);
				// }
			}

			if(type === 'secuencia-accion') {
				if(args[0]){
					this.toastService.show('Secuencia didactica guardada.', { classname: 'bg-success text-light', delay: 3000 });
					this.stateBotonGuardarEditarSecuencia = true;
				}
				else
					this.toastService.show('Ocurrio un problema al guardar la secuencia didactica. Por favor intente nuevamente.', { classname: 'bg-danger text-light', delay: 3000 });

				this.secuenciaAgregando = false;

			}

			if(type === 'deleteSecuencia') {
				if(args[0]) {
					this.toastService.show('Secuencia didactica eliminada.', { classname: 'bg-success text-light', delay: 3000 });
          this.value = '';
					this.stateBotonGuardarEditarSecuencia = false;
				}
				else
					this.toastService.show('Ocurrio un problema al eliminar la secuencia didactica. Por favor intente nuevamente.', { classname: 'bg-danger text-light', delay: 3000 });
			}

			if(type === 'abrirGuardarPanelProyecto') {
				this.value = '';
				 if(args.arguments.length > 0) {
					this.value = args.arguments[0].data;
				 }
			}

		});

		this.dataService.nombreLibroActual$.subscribe(nombre => this.nombreLibro = nombre);

		

	}
  ngAfterViewInit(): void {

  }

  initEditor(): void {

  }

	ionViewWillEnter() {
		this.appPages[0].activo = true;
		this.datosGenUsuario['iniciales'] = this.getTokenData('nombre').substring(0, 2);
		this.datosGenUsuario['nombre'] = this.getTokenData('nombre');
	}

  checkImagesFromWord(data: string, ): any {
    console.log("checkImagesFromWord");
    if (!data) return;
    const doc = new DOMParser().parseFromString(data, 'text/html');
    const images = doc.querySelectorAll('img');
    if (!images.length) return;
    this.toastService.show('No se puede adjuntar imágenes.', { classname: 'bg-danger text-light', delay: 3000 });

    setTimeout(() => {
      const regex = /<img\b[^>]*>/g;
      let contenido = this.value;
      let imgsDeleted: any;
      imgsDeleted = contenido.replace(regex, '');
      this.value = imgsDeleted;
    }, 50);

    return false;
  }

	getRangePaginas(count: number): number[] {
		return Array.from({length: count}, (_, index) => index + 1);
	}


	  async guardarSecuencia() {
		const contenidoSecuencia = this.value;
		if(contenidoSecuencia === '' || contenidoSecuencia === undefined || contenidoSecuencia === null) {
			this.toastService.show('Las secuencias didacticas no pueden ir sin texto.', { classname: 'bg-warning text-dark', delay: 3000 });
			return;
		}

		if(contenidoSecuencia.length > 50000) {
			this.toastService.show('La secuencia tiene demasiado contenido Por favor reduzcalo.', { classname: 'bg-warning text-dark', delay: 5000 });
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
		 this.secuenciaAgregando = true;
	}


	guardarRequerimiento() {
		console.log("Guardar Requerimiento");
		const contenidoRequerimiento = this.value;

		// revisar por posibles edits en blanco y/o eliminar
		if(contenidoRequerimiento === null) {
			this.toastService.show('El contenido no puede ir sin texto.', { classname: 'bg-warning text-dark', delay: 3000});
			return;
		}

		this.selectLeccion = this.dataService.valueProyecto;

		const sendDataLibro = {
			type: 'addProyecto',
			functionName: 'addProyecto',
			arguments: {
				data: contenidoRequerimiento,
				ejercicio: 0,
				elemento: `proyecto_${this.dataService.nomenclaturaProyecto}_${this.dataService.paginaActualProyecto}`,
				pagina: this.dataService.paginaActualProyecto,
				libroid: 0,
				userCreate: this.getTokenData('usuario')
			}
		};

		this.dataService.addRequerimiento(sendDataLibro);

		this.toastService.show('Contenido guardado.', { classname: 'bg-success text-dark', delay: 3000});
	}

	async borrarSecuencia() {
		const { elemento, libroid} = this.secuenciaActualData;

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
					const sendData = {
						type: 'deleteSecuencia',
						arguments: [{
							libroid: libroid,
							elemento: elemento
						}]
					};
					// this.dataService.deleteSecuencia(sendData);

					this.dataService.deleteSecuencia(sendData);
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
		this.nombreLibro = '';
		this.dataService.estadoModal = false;
		this.dataService.estadoModalMain = false;
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe(false);
		this.appPages[0].activo = pageTipo === 'libros';
		// this.appPages[1].activo = pageTipo === 'secuencias';
	}

	regresarInicio() {
		const cerrarIframe  = false;
    this.value = '';
		this.dataService.estadoModal = false;
		this.dataService.estadoModalMain = false;
		this.chosePage('libros');
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe( cerrarIframe );
	}

	selectDropDown(event: any) {

		const opcion = event.detail.value;
		this.selectAcciones = opcion;
		if(opcion === 'crear-secuencia') {
			this.dataService.abrirModal();
			const elementEventPaste = this.quilleditorSec;
			this.dataService.estadoModalMain = false;
			if(!this.hasDataSecuencia) {
        this.value = '';
				this.stateBotonGuardarEditarSecuencia = false;
			}
		}

		if(opcion === 'nuevo-robotica') this.dataService.abrirModalMain();
		
		//prevent drop event from other tabs
		// this.renderer.listen(this.quilleditorSec.nativeElement, 'drop', (event) => {
		// 	event.preventDefault();
		// });

		// evento al momento de pegar en el quill editor. Elimina las imagenes despues de hacer el pegado.
		this.renderer.listen(this.quilleditorSec.nativeElement, 'paste', (event: ClipboardEvent) => {
			setTimeout(() => {
        console.log('after paste viejo')
				const regex = /<img\b[^>]*>/g;
				let contenido = this.value;
				let imgsDeleted: any;
				imgsDeleted = contenido.replace(regex, '');
				this.value = imgsDeleted;
			 }, 50);
		});

	}

	cleanSelectDropDown() {
		this.selectAcciones = '';
	}

	onLogout() {
		this.dataService.estadoModal = false;
		this.dataService.estadoModalMain = false;
		this.dataService.setNombreLibroActual('');
		this.dataService.setStateIframe( false );
		setTimeout(() => {
			this.appPages[0].activo = false;
			// this.appPages[1].activo = false;
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

}





