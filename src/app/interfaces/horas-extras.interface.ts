import { Funcionario } from "./funcionario.interface";

export interface HorasExtras {
  _id?: string | '';
  FuncionarioAsignado: Funcionario | null ; // El ID del funcionario
  fecha_inicio_trabajo: string;
  hora_inicio_trabajo: string;
  fecha_fin_trabajo: string;
  hora_fin_trabajo: string;
  es_festivo_Inicio?: boolean;
  es_festivo_Fin?: boolean;
  fecha_inicio_descanso?: string; // Opcional
  hora_inicio_descanso?: string; // Opcional
  fecha_fin_descanso?: string; // Opcional
  hora_fin_descanso?: string; // Opcional
  // Otros campos calculados por el backend (no los enviamos, solo los recibimos)
  HEDO?: string;
  HENO?: string;
  HEDF?: string;
  HENF?: string;
  HDF?: string;
  HNF?: string;
  RNO?: string;
  horas_extras?: string;
}