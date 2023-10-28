import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TiempoDeUsoDeDocentesService } from 'src/app/services/tiempo-de-uso-de-docentes.service';
import { Campus } from './interfaces/campus';
import { DocenteByCampus } from './interfaces/docente-by-campus';

@Component({
  templateUrl: './tiempo-de-uso-de-docentes.page.html',
  styleUrls: ['./tiempo-de-uso-de-docentes.page.scss']
})
export class TiempoDeUsoDeDocentesPage implements OnInit{

  public librosDescargadosSelect : object = {
    cssClass: 'librosDescargados-select',
    animated: true,
    mode: 'ios',
    dismissOnSelect: false,
    side: 'bottom',
    alignment: 'start',
    arrow: false,
    size:'cover'
  }


  public InfoDocente = [
    {Id:1, Docente: 'Daniel Omar Cuellar Álvarez', Campus: 'Mazatlán',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:4, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:5, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ]
    },
    {Id:2, Docente: 'Daniel Sánchez López', Campus: 'Culiacán',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
    {Id:3, Docente: 'Daniel Paredes Magaña', Campus: 'Durango',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
    {Id:4, Docente: 'Daniel Eduardo Guerra Bobadilla', Campus: 'Zacatecas',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
    {Id:5, Docente: 'Daniel Rodríguez Sánchez', Campus: 'Durango',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
    {Id:6, Docente: 'Daniel Bravo Gutiérrez', Campus: 'Mazatlán',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
    {Id:7, Docente: 'Daniel López López', Campus: 'Mazatlán',
    libros:[
      {Id:1, Nombre: 'Geography',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:2, Nombre: 'Matematicas',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      {Id:3, Nombre: 'Spanish',Escolaridad:'Primaria', RutaThumbnails: "default-libro.jpg"},
      ] 
    },
  ];

  public InformacionDocente: any[] = [];

  public busquedaVisible: boolean = false;
  
  public cargandoInfoDocente:boolean = false;
  public DocenteSeleccionado: boolean = false;
  public libroSeleccionado: boolean = false;
  public cargandoSkeleton: boolean = false;
  public errorlibros: boolean = false;
  
  public ionSelectValues: Campus[] = [];
  public BusquedaResults: DocenteByCampus[] = [];
  public docenteSeleccionadoData: any = [];
  public isLoadingBusqueda: boolean = false;
  public BusquedaNoHayRelaciones:boolean = false; 
  public TotalDocentesByCampus: number = 0;
  public TotalCampusSeleccionado: boolean = false;
  public idDocenteSelect: number = 0;
  
  constructor(
    private tiempodeusoService: TiempoDeUsoDeDocentesService,
  ){}

  ngOnInit(): void {
    this.tiempodeusoService.getCampus().pipe(
      take(1)
      ).subscribe((responseData) => {
      console.log(responseData);
      this.ionSelectValues = responseData;
    });  
  }

  handleChange(e) {
    this.TotalCampusSeleccionado = false; 
    this.isLoadingBusqueda = true;
    const idSelect = e.detail.value;
    this.idDocenteSelect = idSelect;
    
      this.tiempodeusoService.getTotalDocentesByCampus(idSelect).pipe(
        take(1)
      ).subscribe((responseData) => {
        console.log('select', responseData);
        this.TotalDocentesByCampus = responseData;
        this.isLoadingBusqueda = false;
        this.busquedaVisible = true;
        this.TotalCampusSeleccionado = true;
      });
  }
  
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    
    if (query !== '') {
      this.tiempodeusoService.getDocentesByName(this.idDocenteSelect,query).pipe(
        take(1)
      ).subscribe((responseData) => {
        console.log('busqueda', responseData);
        this.TotalDocentesByCampus = responseData.length;
        this.TotalCampusSeleccionado = false;
      
        if (responseData.length === 0) {
          // No se encontraron resultados, así que restauramos los originales
          this.BusquedaResults = [];
          this.BusquedaNoHayRelaciones = true;
        } else {
          this.BusquedaNoHayRelaciones = false;
          this.BusquedaResults = responseData;
        }
        this.isLoadingBusqueda = false;
        this.busquedaVisible = true;
      });
    }
    
    if(query.length === 0){
      this.tiempodeusoService.getTotalDocentesByCampus(this.idDocenteSelect).pipe(
        take(1)
      ).subscribe((responseData) => {
        this.TotalDocentesByCampus = responseData;
        this.TotalCampusSeleccionado = true;
        this.isLoadingBusqueda = false;
        this.busquedaVisible = true;
      });
    }
  
  }

  handleInputSearch(){
    this.isLoadingBusqueda = true; 
    this.BusquedaNoHayRelaciones = false;
    this.TotalCampusSeleccionado = false;
  }
  
  cerrarSearchbar(){ 
    // this.busquedaVisible = false;
  }

   selectDocente(id: number) {
    console.log('seleccionado docente',id);
    this.busquedaVisible = false;
    this.cargandoInfoDocente = true;
    this.DocenteSeleccionado = true;
    this.libroSeleccionado = false;

    this.tiempodeusoService.getLibrosDocente(id).pipe(
      take(1)
    ).subscribe((responseData) => {
      console.log(responseData);
      this.docenteSeleccionadoData = responseData;
      this.cargandoInfoDocente = false;
    });

  }

manejarLibroSeleccionado(id:number){
    this.libroSeleccionado = true;
    this.cargandoSkeleton = true;
    console.log(id);

    if(id === 1){

      setTimeout(() => {
        this.errorlibros = true;
        this.cargandoSkeleton = false;
      }, 1000);
    }else{


      setTimeout(() => {
        this.errorlibros = false;
        this.cargandoSkeleton = false;
      }, 1000);
    }
}

}
