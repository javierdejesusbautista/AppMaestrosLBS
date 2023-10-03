import { NgModule } from '@angular/core';
import { librosDescargadosPage } from './libros-descargados.page';
import { CommonModule } from '@angular/common';
import { librosDescargadosRoutingModule } from './libros-descargados-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        librosDescargadosRoutingModule,
        IonicModule,
        FormsModule,
    ],
    exports: [librosDescargadosPage],
    declarations: [librosDescargadosPage],
    providers: [],
})
export class librosDescargadosModule { }
