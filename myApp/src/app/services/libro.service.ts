import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

	private url: string = 'https://pruebasnek-default-rtdb.firebaseio.com';

  	constructor(private http: HttpClient) { }


	createRegistroLibro(libro: any ) {
		return this.http.put(`${this.url}/${libro.idLibro}.json`, libro);
	}

	getLibroExiste(idLibro: string)  {
		return this.http.get(`${this.url}/${idLibro}.json`)
	}

	addSecuenciaLibro(idLibro: string, datosLibro: any) {
		return this.http.post(`${this.url}/${idLibro}/secuencias.json`, datosLibro);
	}

	getLibrosSecuencias() {
		return this.http.get(`${this.url}/.json`).pipe(
			map(res => this.crearArray(res)), delay(0));
	}

	editSecuenciaLibro(secuenciaId: string, idLibro: string, contenido: string) {
		return this.http.patch(`${this.url}/${idLibro}/secuencias/${secuenciaId}.json`, {contenido});
	}

	deleteSecuenciaLibro(idLibro: string, idSecuencia: string) { 
		return this.http.delete(`${this.url}/${idLibro}/secuencias/${idSecuencia}.json`);
	}


	/**
	 * 
	 * @param data datos de firebase
	 * @returns JSON convertido a Array of objects
	 */
	private crearArray(data: any) {
		const resultArray = Object.keys(data).map(key => {
			const bookObj = data[key];
			const secuenciasArray = bookObj.secuencias ? 
			  	Object.keys(bookObj.secuencias).map(secuenciaKey => ({ 
					id: secuenciaKey, 
					...bookObj.secuencias[secuenciaKey] 
				})) : 
			  [];
			return { id: key, ...bookObj, secuencias: secuenciasArray };
		  });
	
		return resultArray;
	}


}
