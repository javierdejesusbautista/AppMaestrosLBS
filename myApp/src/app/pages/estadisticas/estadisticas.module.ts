import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasPage } from './estadisticas.page';
import { IonicModule } from '@ionic/angular';
import { estadisticasRoutingModule } from './estadisticas-routing.module';
import { sharedModule } from 'src/app/shared/shared.module';



@NgModule({

  declarations: [
    EstadisticasPage,
  ],
  imports: [
    estadisticasRoutingModule,
    CommonModule,
    IonicModule,
    sharedModule
  ]
})
export class EstadisticasPageModule { }
