import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecuenciasPage } from './secuencias.page';

const routes: Routes = [
  {
    path: '',
    component: SecuenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuenciasPageRoutingModule {}
