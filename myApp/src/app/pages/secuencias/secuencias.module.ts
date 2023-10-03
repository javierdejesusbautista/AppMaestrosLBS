import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { secuenciasPage } from './secuencias.page';
import { secuenciasRoutingModule } from './secuencias-routing.module';



@NgModule({

  declarations: [secuenciasPage],
  exports:[secuenciasPage],
  imports: [
    secuenciasRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class SecuenciasPageModule { }
