import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasPage } from './estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasPage,
  },
  {
    path: 'libros-descargados',
    loadChildren: () =>
      import('../libros-descargados/libros-descargados.module').then((m) => m.librosDescargadosModule),
  },
  {
    path: 'tiempo-de-uso-de-docentes',
    loadChildren: () =>
      import('../tiempo-de-uso-de-docentes/tiempo-de-uso-de-docentes.module').then((m) => m.TiempoDeUsoDeDocentesModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class estadisticasRoutingModule {}
