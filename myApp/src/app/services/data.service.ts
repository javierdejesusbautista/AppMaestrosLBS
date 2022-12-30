import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

  estadoModal = false;

  locations = new Observable((pagina) => {
   
    window.addEventListener('message', (event)=>{
      pagina.next(event.data);
    }, false)
    
  });

  abrirModal(){
    this.estadoModal = this.estadoModal ? false : true;
  }

  constructor() { }
   
}