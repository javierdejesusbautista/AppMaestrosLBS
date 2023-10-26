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

  

  librosDescargadosSelect : object = {
      
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

  public campus = [
    {Id:1, Nombre:'Mazatlán'},
    {Id:2, Nombre:'Culiacán'},
    {Id:3, Nombre:'San Luis Potosi'},
    {Id:4, Nombre:'Zacatecas'},
    {Id:5, Nombre:'Durango'},
    {Id:5, Nombre:'Torreon'},
  ]

  public InformacionDocente: any[] = [];

  public DocentesByCampusTotal: number = 0;
  public busquedaVisible: boolean = false;
  
  public cargandoInfoDocente:boolean = false;
  public DocenteSeleccionado: boolean = false;
  public selectValues: any[] = [];
  public libroSeleccionado: boolean = false;
  public cargandoSkeleton: boolean = false;
  public errorlibros: boolean = false;
  
  public ionSelectValues: Campus[] = [];
  public DocentesByCampus: DocenteByCampus[] = [];
  public BusquedaResults: DocenteByCampus[] = [];
  public docenteSeleccionadoData: any = {};
  
  public shownData: number = 10;

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

  handleInput(event) {
    const query = event.target.value.toLowerCase();
  
    // Filtrar solo si query no está vacío
    if (query !== '') {
      this.BusquedaResults = this.DocentesByCampus.filter(item => 
        item.UsuarioNombreCompleto.toLowerCase().includes(query)
      );
    } else {
      this.BusquedaResults = [...this.DocentesByCampus];
    }
  
    this.totalData(this.BusquedaResults);
    this.busquedaVisible = true;
  
  }
  
  

  handleChange(e) {
    const idDocente  = e.detail.value;

    this.tiempodeusoService.getDocentesByCampus(idDocente).pipe(
      take(1)
      ).subscribe((responseData) => {
      console.log(responseData);
      this.DocentesByCampus = responseData;
      this.BusquedaResults = responseData;
      this.DocentesByCampusTotal = responseData.length;
    });
    
    this.busquedaVisible = true;
    this.handleInput({ target: { value: ' ' } });
  }

  totalData(results: DocenteByCampus[]) {
    this.DocentesByCampusTotal = results.length;
  }

  async selectDocente(id: number) {
    this.busquedaVisible = false;
    this.cargandoInfoDocente = true;
    this.DocenteSeleccionado = true;
    this.libroSeleccionado = false;

    let docenteSeleccionadoData: any = [];

    docenteSeleccionadoData = await this.BusquedaResults.find(docente => docente.UsuarioId === id);
    
    setTimeout(() => {
      // Verifica si los datos se han cargado completamente
      if (docenteSeleccionadoData) {
        this.docenteSeleccionadoData = docenteSeleccionadoData;
        this.cargandoInfoDocente = false;
      }
    }, 2000);

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
