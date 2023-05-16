import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

	private url: string = 'https://pruebasnek-default-rtdb.firebaseio.com';
	private urlOmega: string = 'https://www.alfalbs.app/ApiOmega';
	 //private urlOmega: string ='http://172.16.12.40:5000';
	//private urlOmega: string ='https://172.16.12.40:5001';
	ws: string = 'api/codigos';

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


	getTodosLosLibros() {
		return this.http.get<any[]>(`${this.urlOmega}/${this.ws}/gradosMaestros`);
		// return this.http.get<any[]>(`${this.urlOmega}/${this.ws}/grados`);
	}


	getSecuenciasLibro(idLibro: any) {
		return this.http.get(`${this.url}/${idLibro}/secuencias.json`).pipe(
			map(res => this.createArraySecuencias(res)), delay(0));
	}

	getSecuenciaPag({pagina, idLibro}: any) {
		// return this.http.get<any[]>(`${this.url}/${idLibro}/`);
		return new Observable();
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


	private createArraySecuencias(data: any) {
		if (!data) return {};
		return  Object.keys(data).map(key => ({ id: key, ...data[key] }));
	}


}
