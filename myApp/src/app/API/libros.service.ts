import { Injectable } from '@angular/core';
import { apiBase } from './apiBase';

@Injectable({
  providedIn: 'root'
})
export class LibrosService extends apiBase{

  constructor() { 
    super();
  }

	peticionLibros(){
    	return  this.libros;
  }
}
