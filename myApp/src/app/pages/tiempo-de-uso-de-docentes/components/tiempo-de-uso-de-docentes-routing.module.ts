import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiempoDeUsoDeDocentesPage } from '../tiempo-de-uso-de-docentes.page';



const routes: Routes = [
  {
    path: '',
    component: TiempoDeUsoDeDocentesPage, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiempoDeUsoDeDocentesRoutingModule {}
