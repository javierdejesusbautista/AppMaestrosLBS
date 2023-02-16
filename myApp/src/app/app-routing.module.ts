import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
//   {
//     path: 'libros/Libro',
//     loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule)
//   },
//   {
//     path: 'secuencias/Secuencia',
//     loadChildren: () => import('./pages/secuencias/secuencias.module').then( m => m.SecuenciasPageModule),
// 	canActivate: [AuthGuardService]
//   },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
	canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
