import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { librosDescargadosPage } from './libros-descargados.page';

const routes: Routes = [
  {
    path: '',
    component: librosDescargadosPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class librosDescargadosRoutingModule {}
