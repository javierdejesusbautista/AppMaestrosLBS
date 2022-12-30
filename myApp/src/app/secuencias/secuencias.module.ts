import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecuenciasPageRoutingModule } from './secuencias-routing.module';

import { SecuenciasPage } from './secuencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecuenciasPageRoutingModule
  ],
  declarations: [SecuenciasPage]
})
export class SecuenciasPageModule {}
