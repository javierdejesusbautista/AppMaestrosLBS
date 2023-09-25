import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



import { IonMenu, IonicModule } from '@ionic/angular';

import { QuillModule } from 'ngx-quill';
import ImageCompress from 'quill-image-compress';


import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { SelectScrollDirective } from '../../directives/select-scroll.directive';

import { ToastsComponent } from 'src/app/components/toasts/toasts.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SecuenciasComponent } from 'src/app/components/secuencias/secuencias.component';
import { menuComponent } from 'src/app/components/menu/menu.component';
import { navbarComponent } from 'src/app/components/navbar/navbar.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { EstadisticasPageModule } from '../estadisticas/estadisticas.module';
import { EstadisticasPage } from '../estadisticas/estadisticas.page';


@NgModule({
	imports: [
    CommonModule,
    IonicModule,
	HttpClientModule,
    HomePageRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	QuillModule.forRoot({
		customModules: [{
			implementation: ImageCompress,
			path: 'modules/imageCompressor'
		}]
	}),
	AngularFirestoreModule,
	ToastsComponent,
	sharedModule,
  ],
  providers: [
	FolderComponent,
	IonMenu
  ],
  declarations: [HomePage, FolderComponent, SecuenciasComponent,menuComponent,navbarComponent,EstadisticasPage],
})
export class HomePageModule {}
