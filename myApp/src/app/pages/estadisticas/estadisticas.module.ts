import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasPage } from './estadisticas.page';
import { IonicModule } from '@ionic/angular';
import { estadisticasRoutingModule } from './estadisticas-routing.module';
import { cardUsuariosComponent } from './components/card-usuarios/card-usuarios.component';
import { cardLibrosDescargadosComponent } from './components/card-libros-descargados/card-libros-descargados.component';
import { FormsModule } from '@angular/forms';



@NgModule({

  declarations: [
    EstadisticasPage,
    cardUsuariosComponent,
    cardLibrosDescargadosComponent,
  ],
  exports:[EstadisticasPage],
  imports: [
    estadisticasRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class EstadisticasPageModule { }
