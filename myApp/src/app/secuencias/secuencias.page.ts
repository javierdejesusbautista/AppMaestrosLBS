import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { title } from 'process';
import { db } from '../db/db';

@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.page.html',
  styleUrls: ['./secuencias.page.scss'],
})
export class SecuenciasPage implements OnInit {

  secuencias$:any = [];

  constructor() { }

  ngOnInit() {
     db.secuenciaLists.toArray().then((data)=>{
       this.secuencias$ = data
       console.log(data)
    })
  }

}
