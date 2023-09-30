import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



import { IonicModule } from '@ionic/angular';

import { QuillConfig, QuillModule } from 'ngx-quill';
import ImageCompress from 'quill-image-compress';


import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { SelectScrollDirective } from '../../directives/select-scroll.directive';

import { ToastsComponent } from 'src/app/components/toasts/toasts.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SecuenciasComponent } from 'src/app/components/secuencias/secuencias.component';
import { NgxJoditModule } from 'ngx-jodit'
// import { BrowserModule } from "@angular/platform-browser";
import Quill from "quill";
//import QuillBetterTable from "quill-better-table";


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
	ToastsComponent
  ],

  providers: [
    FolderComponent
  ],
  declarations: [ HomePage, FolderComponent, SecuenciasComponent],
  // bootstrap: [AppComponent]
})


export class HomePageModule {}
