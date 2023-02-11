import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FolderPageModule } from './folder/folder.module';
import { FolderPage } from './folder/folder.page';
import { SelectScrollDirective } from './directives/select-scroll.directive';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SelectScrollDirective],
  imports: [BrowserModule,
	IonicModule.forRoot(),
	AppRoutingModule,
	FormsModule,
	FolderPageModule,
	QuillModule.forRoot(),
	HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
