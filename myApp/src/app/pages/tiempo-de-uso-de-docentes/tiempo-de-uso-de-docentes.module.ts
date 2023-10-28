import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { TiempoDeUsoDeDocentesRoutingModule } from './components/tiempo-de-uso-de-docentes-routing.module';
import { TiempoDeUsoDeDocentesPage } from './tiempo-de-uso-de-docentes.page';
import { DocenteInfoComponent } from './components/docente-info/docente-info.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { ResumenEsperaComponent } from './components/resumen-espera/resumen-espera.component';
import { GraficaEsperaComponent } from './components/grafica-espera/grafica-espera.component';
import { ResumenResultadoComponent } from './components/resumen-resultado/resumen-resultado.component';
import { GraficaResultadoComponent } from './components/grafica-resultado/grafica-resultado.component';
import { ResumenLoadingComponent } from './components/skeleton-loading/components/resumen-loading/resumen-loading.component';
import { GraficaLoadingComponent } from './components/skeleton-loading/components/grafica-loading/grafica-loading.component';
import { FormsModule } from '@angular/forms';
import { ResumenErrorComponent } from './components/resumen-error/resumen-error.component';
import { GraficaErrorComponent } from './components/grafica-error/grafica-error.component';


@NgModule({
  declarations: [
    TiempoDeUsoDeDocentesPage,
    SkeletonLoadingComponent,
    DocenteInfoComponent,
    VistaPrincipalComponent,
    ResumenEsperaComponent,
    GraficaEsperaComponent,
    ResumenResultadoComponent,
    GraficaResultadoComponent,
    ResumenLoadingComponent,
    GraficaLoadingComponent,
    ResumenErrorComponent,
    GraficaErrorComponent,
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TiempoDeUsoDeDocentesRoutingModule
  ]
})
export class TiempoDeUsoDeDocentesModule { }
