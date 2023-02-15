import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// import { QuillModule } from 'ngx-quill';

import { SelectScrollDirective } from './directives/select-scroll.directive';;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
	AppComponent, 
	SelectScrollDirective, 
	],
  imports: [BrowserModule,
	IonicModule.forRoot(),
	AppRoutingModule,
	FormsModule,
	HttpClientModule
	//QuillModule.forRoot(),
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
