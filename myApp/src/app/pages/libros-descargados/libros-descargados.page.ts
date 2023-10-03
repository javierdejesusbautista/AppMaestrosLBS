import { Component, OnInit } from '@angular/core';

declare var Chart: any;

@Component({
    selector: 'libros-descargados-page',
    templateUrl: './libros-descargados.page.html',
    styleUrls:['./libros-descargados.page.scss']
})

export class librosDescargadosPage implements OnInit {
    
    public pocentaje0a39: string ='#FF6464';
    public pocentaje40a69: string ='#FFD464';
    public pocentaje70a100: string ='#00DE80';

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
    constructor() { }
    
    

     ngOnInit(): void {
        const ctx = document.getElementById('Libros-Descargados');
        new Chart(ctx, {
          type: 'doughnut', // Tipo de gráfico dona
          data: {
            labels: ['Descargados','No descargados'],
            datasets: [{
              data: [59,41], // El valor 100 representa el 100% del gráfico y es de color verde
              backgroundColor: ['#FFD464','transparent'], // Cambia el color aquí
            }]
          },
          options: {
              cutout: '75%',
                plugins: {
                    legend: {
                        display: false, // Desactiva la leyenda
                    },
                    tooltip: {
                        enabled: true, // Desactiva las etiquetas emergentes al pasar el mouse sobre el gráfico
                    },
                },
          }
        });
      }
}