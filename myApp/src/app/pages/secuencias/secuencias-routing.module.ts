import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { secuenciasPage } from './secuencias.page';

const routes: Routes = [
  {
    path: '',
    component: secuenciasPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class secuenciasRoutingModule {}
