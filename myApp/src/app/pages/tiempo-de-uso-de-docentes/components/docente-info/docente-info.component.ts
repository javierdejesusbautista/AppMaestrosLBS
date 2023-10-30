import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'docente-info',
  templateUrl: './docente-info.component.html',
  styleUrls: ['./docente-info.component.scss']
})
export class DocenteInfoComponent {

  @Input() DocenteData: any;
  @Input() LibrosDocenteData: any;

  @Output() libroSeleccionadoEvent: EventEmitter<number> = new EventEmitter<number>();

  libroSeleccionado(id: number){
    this.libroSeleccionadoEvent.emit(id);
  }
}
