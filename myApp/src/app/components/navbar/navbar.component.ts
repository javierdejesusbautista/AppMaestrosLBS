import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { QuillEditorComponent } from 'ngx-quill';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { layoutService } from 'src/app/shared/services/layout.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls:['./navbar.component.scss']
})

export class navbarComponent implements OnInit {

    pag = 1;
    nombreLibro: string = '';
    datosGenUsuario: any = {};                                  
    selectAcciones: string = '';
    hasDataSecuencia: boolean = false;
    stateBotonGuardarEditarSecuencia: boolean = false;
    secuenciaActualData: any;
    totalPaginas : number;

	secuenciaAgregando: boolean = false;
	secuenciaBorrando: boolean = false;

    selectLeccion: any;

    formContenidoSecuencia: FormControl = new FormControl();
    formCotenidoProyecto: FormControl = new FormControl();
    @ViewChild(QuillEditorComponent, {read: ElementRef}) quilleditorSec: ElementRef;

   appPages = [
    { title: 'Libros', icon: 'book-outline', tipo: 'libros', activo: true },
    // { title: 'Secuencias', icon: 'document-text-outline', tipo: 'secuencias', activo: false },

  ];
    constructor(public dataService: DataService,
        private authService: AuthService,
        private renderer: Renderer2,
        private layoutService: layoutService,
        public toastService: ToastService,
        private alertController: AlertController,) { }

        ngOnInit() {
            this.appPages[0].activo = true;
            this.datosGenUsuario['iniciales'] = this.layoutService.getTokenData('nombre').substring(0, 2);
            this.datosGenUsuario['nombre'] = this.layoutService.getTokenData('nombre');

            this.dataService.locationsHome.subscribe((dataReceived: any) => {
                console.log("[data received]: ", dataReceived);
                const { type, args } = dataReceived;
                
                if(type === 'pagina') {
                    this.stateBotonGuardarEditarSecuencia = false;
                    this.pag = parseInt(args.pagina);
                    if(args.secuencia !== undefined) {
                        this.hasDataSecuencia = true;
                        this.secuenciaActualData = args.secuencia;
                        this.formContenidoSecuencia.setValue(args.secuencia['data']);
                        this.stateBotonGuardarEditarSecuencia = true;
                    } else {
                        this.formContenidoSecuencia.setValue('');
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
                        this.formContenidoSecuencia.setValue('');
                        this.stateBotonGuardarEditarSecuencia = false;
                    }
                    else
                        this.toastService.show('Ocurrio un problema al eliminar la secuencia didactica. Por favor intente nuevamente.', { classname: 'bg-danger text-light', delay: 3000 });
                }
    
                if(type === 'abrirGuardarPanelProyecto') {
                    this.formCotenidoProyecto.setValue('');
                     if(args.arguments.length > 0) {
                        this.formCotenidoProyecto.setValue(args.arguments[0].data);
                     }
                }	
    
            });
    
            this.dataService.nombreLibroActual$.subscribe(nombre => this.nombreLibro = nombre);
        }

        ionViewWillEnter() {
            console.log('traer datos');
            this.appPages[0].activo = true;
            this.datosGenUsuario['iniciales'] = this.getTokenData('nombre').substring(0, 2);
            this.datosGenUsuario['nombre'] = this.getTokenData('nombre');
        }
    
        getRangePaginas(count: number): number[] {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            return Array.from({length: count}, (_, index) => index + 1);
        }
    
    
          async guardarSecuencia() {
            const contenidoSecuencia = this.formContenidoSecuencia.getRawValue();
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
            const contenidoRequerimiento = this.formCotenidoProyecto.getRawValue();
    
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
    
            console.log(sendDataLibro);
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
            console.log("regresar inicio");
            const cerrarIframe  = false;
            this.formContenidoSecuencia.setValue('');
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
                    this.formContenidoSecuencia.setValue('');
                    this.stateBotonGuardarEditarSecuencia = false;
                }
            }             
                
            if(opcion === 'nuevo-robotica') this.dataService.abrirModalMain();
            
            console.log(this.quilleditorSec);
            //prevent drop event from other tabs
            this.renderer.listen(this.quilleditorSec.nativeElement, 'drop', (event) => {
                event.preventDefault();
            });
    
            // evento al momento de pegar en el quill editor. Elimina las imagenes despues de hacer el pegado.
            this.renderer.listen(this.quilleditorSec.nativeElement, 'paste', (event: ClipboardEvent) => {
                setTimeout(() => {
                    const regex = /<img\b[^>]*>/g;
                    let contenido = this.formContenidoSecuencia.getRawValue();
                    let imgsDeleted: any;
                    imgsDeleted = contenido.replace(regex, '');
                    this.formContenidoSecuencia.setValue(imgsDeleted); 
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