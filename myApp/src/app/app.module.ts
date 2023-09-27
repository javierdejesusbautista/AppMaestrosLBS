import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';


// import { QuillModule } from 'ngx-quill';

import { SelectScrollDirective } from './directives/select-scroll.directive';;
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

//import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
	AppComponent, 
	SelectScrollDirective, 
	],
  imports: [
	BrowserModule,
	IonicModule.forRoot(),
	AppRoutingModule,
	FormsModule,
	HttpClientModule,
	AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule,
	AngularFireFunctionsModule,
	//NgbToastModule

	//QuillModule.forRoot(),
],
  providers: [
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true},
	{ provide: LocationStrategy, useClass: HashLocationStrategy},
],
  bootstrap: [AppComponent],
})
export class AppModule { }
