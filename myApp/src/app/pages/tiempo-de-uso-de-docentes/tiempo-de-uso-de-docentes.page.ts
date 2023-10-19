import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  templateUrl: './tiempo-de-uso-de-docentes.page.html',
  styleUrls: ['./tiempo-de-uso-de-docentes.page.scss']
})
export class TiempoDeUsoDeDocentesPage implements AfterViewInit {
  @ViewChild('headerImage') headerImage: ElementRef;
  @ViewChild('cardContent') cardContent: ElementRef;

  ngAfterViewInit() {
    const imageHeight = this.headerImage.nativeElement.clientHeight;
    this.cardContent.nativeElement.style.marginTop = `${imageHeight}px`;
  }

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

  public data = [
    'Daniel Omar Cuellar Álvarez - Primaria - Mazatlán',
    'Daniel Sánchez López - Secundaria - Culiacán',
    'Daniel Paredes Magaña - Primaria - Durango',
    'Daniel Eduardo Guerra Bobadilla - Primaria - Zacatecas',
    'Daniel Bravo Gutierrez - Primaria - Mazatlán',
    'Daniel Rodríguez Sánchez - Secundaria - Durango',
    'Daniel Lopez Lopez - Licenciatura - Mazatlán',
  ];
  public results: string[] = [...this.data];

  public TotalResult: number = this.data.length;

  public busquedavisible: boolean = false;

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    if(query != ''){

      this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
      this.totalData(this.results);
      this.busquedavisible = true;
    }else{
      this.busquedavisible = false;
    }
  }

  totalData(results: string[]) {
    this.TotalResult = this.results.length;
  }

}
