import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campus } from '../pages/tiempo-de-uso-de-docentes/interfaces/campus';
import { DocenteByCampus } from '../pages/tiempo-de-uso-de-docentes/interfaces/docente-by-campus';

@Injectable({
  providedIn: 'root'
})
export class TiempoDeUsoDeDocentesService {

  private BaseUrlBackendLocal: string = 'https://192.168.58.240:5001';
  private BaseUrlBackend: string = 'https://www.alfalbs.app/ApiOmega';
  private ws: string = 'api/ReportesPerseus'

  constructor(private http: HttpClient ) { }

  getCampus()  {
		return this.http.get<Campus[]>(`${this.BaseUrlBackend}/${this.ws}/getCampus`);
	}

  getDocentesByName(id: number , query: string) {
      return this.http.get<DocenteByCampus[]>(`${this.BaseUrlBackend}/${this.ws}/getDocentesByName/${id}/${query}`);
  }
  
  getTotalDocentesByCampus(id: number) {
      return this.http.get<number>(`${this.BaseUrlBackend}/${this.ws}/getTotalDocentesByCampus/${id}`);
  }

  getLibrosDocente(id: number) {
      return this.http.get<number>(`${this.BaseUrlBackend}/${this.ws}/getLibrosDocente/${id}`);
  }
}
