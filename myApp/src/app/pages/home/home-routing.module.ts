import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FolderComponent } from 'src/app/components/folder/folder.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'libros',
    component: FolderComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
