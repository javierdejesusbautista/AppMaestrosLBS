import { Injectable } from '@angular/core';
//import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
//import { collection, getDocs, Firestore } from "firebase/firestore";

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SecuenciasFsService {
	usuario: string;
	secData$: Observable<any[]>;

	doc: any;

  constructor(private firestore: AngularFirestore,
	private firebaseFunctions: AngularFireFunctions) { 
		if(localStorage.getItem('USER_INFO') !== null ) {
			this.usuario = this.getKeyToken('usuario');
		}
  }

	getLibrosSecuencias() {
		return this.firestore.collection('maestrosApp').snapshotChanges();
	}

	getSecuecias(claveLibro: string) {
		return this.firestore.collection(`maestrosApp/libros/${claveLibro}/`).snapshotChanges();
	}

	editSecuencia(claveLibro: string, libroData: any) {
		return this.firestore.collection('maestrosApp')
			.doc('libros')
			.collection(claveLibro)
			.doc(libroData.elemento)
			.set(libroData);
	}

	deleteSecuenciaLibro(claveLibro: string, libroData: any) {
		return this.firestore.collection('maestrosApp')
			.doc('libros')
			.collection(claveLibro)
			.doc(libroData.elemento)
			.delete();
	}


	getLibrosCollectionCloudFunction() {
		const librosCollection: any =  this.firebaseFunctions.httpsCallable('getLibrosCollections');
			return librosCollection({docPath: `maestrosApp/libros`});
	}

	getKeyToken(key: string): string {

		const jwt = localStorage.getItem('USER_INFO');
	
		const jwtData = jwt!.split('.')[1];
		// let decodedJwtJsonData = window.atob(jwtData);
		const decodedJwtJsonData = decodeURIComponent(escape(window.atob(jwtData)));
		const decodedJwtData = JSON.parse(decodedJwtJsonData);
	
		const value = decodedJwtData[key];
	
		return value;
	}
}
