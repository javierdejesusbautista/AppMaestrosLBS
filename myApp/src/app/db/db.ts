import Dexie, { Table } from 'dexie';


export interface SecuenciaList {
	idLibro: string, 
	nombreLibro: string, 
	datosGenerales: {
		id?: number,
		Grados: string, 
		Suffix: string,
		Escolaridad: string,
		NombreArchivo: string,
		contenido: string
	}
};



export class AppDB extends Dexie {

  secuenciaLists!: Table<SecuenciaList, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      secuenciaLists: 'id++'
    });
  }


  async resetDatabase() {
    await db.transaction('rw', 'todoItems', 'todoLists', () => {
      this.secuenciaLists.clear();
    });
  }
}

export const db = new AppDB();
