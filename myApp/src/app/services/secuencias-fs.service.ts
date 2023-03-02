import { Injectable } from '@angular/core';
//import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from "firebase/firestore";

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SecuenciasFsService {
	usuario: string;
	secData$: Observable<any[]>;

	doc: any;

  constructor(private firestore: AngularFirestore) { 
	this.usuario = this.getKeyToken('usuario');
  }

	getLibrosSecuencias() {
		return this.firestore.collection(this.usuario).snapshotChanges();
	}

	getSecuecias(claveLibro: string) {
		return this.firestore.collection(`${this.usuario}/${claveLibro}/secuencias`).snapshotChanges();
	}

	editSecuencia(claveLibro: string, libroData: any) {
		return this.firestore.collection(this.usuario)
			.doc(claveLibro)
			.collection('secuencias')
			.doc(libroData.elemento)
			.set(libroData);
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
