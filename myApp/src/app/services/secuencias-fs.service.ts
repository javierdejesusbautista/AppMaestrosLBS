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

	getTodasSecuencias() {
		 
		return this.firestore.collection('prof1a').doc('EC_libro').collection('secuencia').get().subscribe(data => {
			//console.log(data.id , ' => ', data.data());

			const coll:any = {};
			data.forEach((doc) => {
				console.log(doc.id , ' => ', doc.data());
				coll[doc.id] = doc.data();
				console.log(coll);
			});
		});

		// return this.firestore.collection(`${this.usuario}`).doc('libros').get().subscribe(doc => {
		// 	if (doc.exists) {
		// 		console.log("Document data:", doc.data());
		// 	} else {
				
		// 		console.log("No such document!");
		// }});
			
		//return this.firestore.collection(`${this.usuario}/libros}`).valueChanges();
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
