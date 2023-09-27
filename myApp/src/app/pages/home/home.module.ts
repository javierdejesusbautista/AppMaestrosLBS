import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



import { IonMenu, IonicModule } from '@ionic/angular';

import { QuillConfig, QuillModule } from 'ngx-quill';
import ImageCompress from 'quill-image-compress';


import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { SelectScrollDirective } from '../../directives/select-scroll.directive';

import { ToastsComponent } from 'src/app/components/toasts/toasts.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SecuenciasComponent } from 'src/app/components/secuencias/secuencias.component';
import { NgxJoditModule } from 'ngx-jodit'
import { menuComponent } from 'src/app/components/menu/menu.component';


@NgModule({
	imports: [
    CommonModule,
    IonicModule,
	  HttpClientModule,
    NgxJoditModule,
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
  ],

  providers: [
	FolderComponent,
	IonMenu
  ],
  declarations: [HomePage, FolderComponent, SecuenciasComponent,menuComponent],
})


export class HomePageModule {}
