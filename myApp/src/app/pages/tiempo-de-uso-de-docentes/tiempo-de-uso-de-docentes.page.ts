import { Component } from '@angular/core';

@Component({
  templateUrl: './tiempo-de-uso-de-docentes.page.html',
  styleUrls: ['./tiempo-de-uso-de-docentes.page.scss']
})
export class TiempoDeUsoDeDocentesPage {

  

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

  public dataSearch = [
    {Id:1, Docente: 'Daniel Omar Cuellar Álvarez', Escolaridad: 'Secundaria', Campus: 'Mazatlán' },
    {Id:2, Docente: 'Daniel Sánchez López', Escolaridad: 'Secundaria', Campus: 'Culiacán' },
    {Id:3, Docente: 'Daniel Paredes Magaña', Escolaridad: 'Primaria', Campus: 'Durango' },
    {Id:4, Docente: 'Daniel Eduardo Guerra Bobadilla', Escolaridad: 'Primaria', Campus: 'Zacatecas' },
    {Id:5, Docente: 'Daniel Rodríguez Sánchez', Escolaridad: 'Secundaria', Campus: 'Durango' },
    {Id:6, Docente: 'Daniel Bravo Gutiérrez', Escolaridad: 'Primaria', Campus: 'Mazatlán' },
    {Id:7, Docente: 'Daniel López López', Escolaridad: 'Licenciatura', Campus: 'Mazatlán' },
  ];

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

  public results: any[] = [...this.dataSearch];
  public TotalResult: number = this.dataSearch.length;
  public busquedaVisible: boolean = false;

  public cargandoInfoDocente:boolean = false;
  public DocenteSeleccionado: boolean = false;
  public docenteSeleccionadoData: any = {};
  public selectValues: any[] = [];
  public libroSeleccionado: boolean = false;
  public cargandoSkeleton: boolean = false;

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    
    // Filtrar solo si query no está vacío y selectValues contiene elementos
    if (query !== '' || this.selectValues.length > 0) {
      this.results = this.dataSearch.filter(item => 
        (query === '' || item.Docente.toLowerCase().includes(query)) && 
        (this.selectValues.length === 0 || this.selectValues.includes(item.Campus))
      );
      this.totalData(this.results);
      this.busquedaVisible = true;
    } else {
      this.results = [...this.dataSearch];
      this.totalData(this.results);
      this.busquedaVisible = false;
    }
  }
  

  handleChange(e) {
    this.selectValues= e.detail.value;
    this.handleInput({ target: { value: ' ' } });
  }

  totalData(results: any[]) {
    this.TotalResult = results.length;
  }

  async selectDocente(id: number) {
    this.busquedaVisible = false;
    this.cargandoInfoDocente = true;
    this.DocenteSeleccionado = true;
    this.libroSeleccionado = false;

    let docenteSeleccionadoData: any = [];

    docenteSeleccionadoData = await this.InfoDocente.find(docente => docente.Id === id);
    
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
    setTimeout(() => {
      
      this.cargandoSkeleton = false;
    }, 1000);
}

}
