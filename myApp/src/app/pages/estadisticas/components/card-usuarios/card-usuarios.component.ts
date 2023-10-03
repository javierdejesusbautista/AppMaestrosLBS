import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'card-usuarios',
    templateUrl: './card-usuarios.component.html',
    styleUrls:['./card-usuarios.component.scss']
})

export class cardUsuariosComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

  
}