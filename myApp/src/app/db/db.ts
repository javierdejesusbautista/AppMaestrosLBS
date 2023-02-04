import Dexie, { Table } from 'dexie';


export interface SecuenciaList {
  Id?: number;
  contenido: string;
  numPagina : number;
  libroNombre: string;
  NombreArchivo: string;
  Grados: string;
  Escolaridad: string;
  idLibro: string;
}



export class AppDB extends Dexie {

  secuenciaLists!: Table<SecuenciaList, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      secuenciaLists: '++id'
    });
  }


  async resetDatabase() {
    await db.transaction('rw', 'todoItems', 'todoLists', () => {
      this.secuenciaLists.clear();
    });
  }
}

export const db = new AppDB();
