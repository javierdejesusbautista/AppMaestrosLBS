import { Injectable } from '@angular/core';
import { datosUsuario } from '../interfaces/datosUsuario';

@Injectable({providedIn: 'root'})
export class layoutService {

    datosGenUsuario: datosUsuario = {
        iniciales: '',
        nombre: ''
    };

    constructor() { }
    
    getTokenData(key: string) {
		const jwt = localStorage.getItem('USER_INFO');
		const jwtData = jwt!.split('.')[1];
		// let decodedJwtJsonData = window.atob(jwtData);
		const decodedJwtJsonData = decodeURIComponent(escape(window.atob(jwtData)));
		const decodedJwtData = JSON.parse(decodedJwtJsonData);
		const value = decodedJwtData[key];
		console.log(value);
		return value;
	}
}