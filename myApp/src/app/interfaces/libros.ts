interface GruposPorEscolaridadYGrado {
    [escolaridad: string]: {
      [grado: string]: any[]; 
    };
  }