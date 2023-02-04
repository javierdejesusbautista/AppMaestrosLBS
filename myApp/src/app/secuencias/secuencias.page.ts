import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { title } from 'process';
import { db } from '../db/db';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.page.html',
  styleUrls: ['./secuencias.page.scss'],
})
export class SecuenciasPage implements OnInit {

  	secuencias$:any ;
	secuenciasTemp: any = []
	secuenciasIsLoading: boolean = false;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
   this.secuenciasIsLoading = true;
	this.getDataSecuencia();
	setTimeout(() => {
		this.secuencias$.forEach((element: any) => {
			element.contenido = this.domSanitizer.bypassSecurityTrustHtml(element.contenido);
		}); 
		this.secuenciasIsLoading = false;
	},400 );
	console.log(this.secuencias$);
  }

  clickDownloadJSON(){
    db.table("secuenciaLists").toArray().then(secuenciaLists => {
      var data1 = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(secuenciaLists));
      var a = document.createElement('a');
      a.href = 'data:' + data1;
      //a.download = nombrePDF.slice(0, -4) +'.json';
      a.innerHTML = 'download JSON';
      a.id='descargarJsonBd'

      var container = document.getElementById('linkDescargarBaseDatos');
      //container.appendChild(a);
      //document.getElementById('descargarJsonBd').click();
    });
  }


  async getDataSecuencia() {
	await db.secuenciaLists.toArray().then( (data) => {
        this.secuencias$ = data;
       console.log(data);
    });
  }
}
