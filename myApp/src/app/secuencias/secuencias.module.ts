import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecuenciasPageRoutingModule } from './secuencias-routing.module';

import { SecuenciasPage } from './secuencias.page';
import { QuillModule } from 'ngx-quill';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    SecuenciasPageRoutingModule,
	QuillModule.forRoot()
  ],
  declarations: [SecuenciasPage]
})
export class SecuenciasPageModule {}
