import { Component, Input, OnInit } from '@angular/core';

declare var Chart: any;

@Component({
  selector: 'grafica-resultado',
  templateUrl: './grafica-resultado.component.html',
  styleUrls: ['./grafica-resultado.component.scss']
})
export class GraficaResultadoComponent implements OnInit {

  @Input() LibroDocenteData: any;

  RutaPortada = 'https://www.alfalbs.app/ApiOmega/covers/';

  public tiempoReal = new Date().getTime();

  public desde: boolean = false;
  public hasta: boolean = false;

  public desdeValue: string = '';
  public hastaValue: string = '';

  public desdeLabel: string = '';
  public hastaLabel: string = '';

  public isLoading: boolean = true;
  
  constructor() {
    // Calcular la fecha del día siguiente
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Establecer los valores en las propiedades desdeValue y hastaValue
    this.desdeValue = today.toISOString();
    this.hastaValue = tomorrow.toISOString();
  }

  onImageLoad() {
    this.isLoading = false;
  }
  
  ngOnInit(): void {
  const ctx = document.getElementById('TiempoDeUsoDeDocentes');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1', '2','3','4','5','6','7','8','9','10'],
      datasets: [
        {
          label: 'Horas de Uso',
          data: [0.1,0.2,0.6,0.8,0.4,0.9,0.1,0.6,0.2,1],
          borderColor: 'white', // Color de las líneas (blanco)
          borderWidth: 2,
          pointBackgroundColor: '#704CEB', // Color de los puntos (morado)
          pointBorderColor: '#704CEB', // Color del borde de los puntos (morado)
          pointRadius: 5, // Tamaño de los puntos
          fill: true, // Relleno de la gráfica
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // Color de fondo blanco con opacidad
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          border: {
            color: 'white',
          } ,
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            color: 'white', 
            font: {
              size: 15, 
              family: 'Volte',
              weight: 500, 
            },
          },
          text: {
            font: {
              weight: 'bold',
              size: 15, 
              family: 'Volte',
            },
            align: 'end', 
            color: 'white',
          },
        },
        y: {
          position: 'left',
          color: 'white', 
          beginAtZero: true,
          text: {
            content: 'Horas de Uso', // Contenido de la etiqueta vertical
            font: {
              weight: 'bold',
              size: 15, // Tamaño de fuente personalizado
              family: 'Volte',
            },
            align: 'center', // Alinea el texto al centro verticalmente
            color: 'white',
          },
          border: {
            color: 'white',
          } ,
          ticks: {
            display: true,
            color: 'white', 
            font: {
              size: 15, 
              family: 'Volte',
              weight: 500, 
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });
}

  

   convertirFormato(fecha: string) {
    const date = new Date(fecha);
  
    // Obtener el día, mes y año
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
  
    // Formatear el resultado como "dd/mm/yyyy"
    const resultado = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
  
    return resultado;
  }
  
  openDatetime(seleccion: string) {
    if (seleccion === 'desde') {
      if(this.desde === false){
        this.desde = true;
        this.hasta = false;

      }else{
        this.desde = false;
        this.hasta = false;
      }
    } else if (seleccion === 'hasta') {
      if(this.hasta === false){
        this.hasta = true;

      }else{
        this.hasta = false;
      }
    }
  }

  closeDatetime(seleccion: string) {
    if (seleccion === 'desde') {
      this.desde = false;
    } else if (seleccion === 'hasta') {
      this.hasta = false;
    }
  }

  onDesdeChange(event: CustomEvent) {
    this.desdeValue = event.detail.value;
    console.log(event.detail.value);
    this.desdeLabel = this.convertirFormato(event.detail.value);
  }

  onHastaChange(event: CustomEvent) {
    this.hastaValue = event.detail.value;
    console.log(event.detail.value);
    this.hastaLabel = this.convertirFormato(event.detail.value);
  }

}
