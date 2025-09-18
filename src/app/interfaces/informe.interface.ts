// Estructura de datos para enviar a la API de creación (lo que el formulario genera)
export interface InformeToCreate {
  fechaInicio: string;
  fechaFin: string;
  tipoOperario: string;
}

// Estructura de datos que la API de listado retorna
// Estructura de datos que la API de listado retorna
export interface InformeFromServer {
  identificacion_Funcionario: string;
  nombre_Funcionario: string;
  fechaInicioReporte: string;
  fechaFinReporte: string;// Corrección aquí (totalHoras_DEC en vez de totalExtras_DEC)
  HEDO_HORA: string;
  HENO_HORA: string;
  HEDF_HORA: string;
  HENF_HORA: string;
  HDF_HORA: string;
  HNF_HORA: string;
  RNO_HORA: string;
  totalHoras_DEC: number;
  totalExtras_DEC: number; // Agregado
  totalSuplementarias_DEC: number; // Agregado
  periodo: string // También incluimos el periodo
}