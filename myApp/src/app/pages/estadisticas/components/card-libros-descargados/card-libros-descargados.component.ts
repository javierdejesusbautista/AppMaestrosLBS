import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

declare var Chart: any;

@Component({
    selector: 'card-libros-descargados',
    templateUrl: './card-libros-descargados.component.html',
    styleUrls: ['./card-libros-descargados.component.scss']
})

export class cardLibrosDescargadosComponent implements OnInit {

    public items: number[] = [1,2,3,4];


    public pocentaje0a39: string ='#FF6464';
    public pocentaje40a69: string ='#FFD464';
    public pocentaje70a100: string ='#00DE80';

    librosDescargadosSelect : object = {
      
      cssClass: 'librosDescargados-select',
        animated: true,
        mode: 'ios',
        dismissOnSelect: false,
        side: 'bottom',
        alignment: 'center',
        arrow: false,
        size:'cover',
    }
    
    constructor(
      private router: Router,
      private dataService: DataService,
      ) { }

    
    ngOnInit(): void {
        const ctx = document.getElementById('LibrosDescargados');
        new Chart(ctx, {
          type: 'doughnut', // Tipo de gráfico dona
          data: {
            labels: ['Descargados','No descargados'],
            datasets: [{
              data: [76,23], // El valor 100 representa el 100% del gráfico y es de color verde
              backgroundColor: ['#00DE80','transparent'], // Cambia el color aquí
            }]
          },
          options: {
              cutout: '70%',
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

      navigateTo(){
        this.dataService.rutaActual('/home/estadisticas/libros-descargados');
        this.router.navigate(['/home/estadisticas/libros-descargados']);
    }
}