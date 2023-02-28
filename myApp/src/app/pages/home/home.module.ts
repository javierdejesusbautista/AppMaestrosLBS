import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { IonicModule } from '@ionic/angular';

import { QuillModule } from 'ngx-quill';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { SelectScrollDirective } from '../../directives/select-scroll.directive';

import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SecuenciasComponent } from 'src/app/components/secuencias/secuencias.component';

@NgModule({
	imports: [
    CommonModule,
    IonicModule,
	HttpClientModule,
    HomePageRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	QuillModule.forRoot(),
	AngularFirestoreModule
  ],
  providers: [
	FolderComponent
  ],
  declarations: [HomePage, FolderComponent, SecuenciasComponent],
})
export class HomePageModule {}
