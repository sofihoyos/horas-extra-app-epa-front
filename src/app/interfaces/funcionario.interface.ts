// src/app/interfaces/funcionario.interface.ts
import { Cargo } from './cargo.interface';

export interface Funcionario {
    _id?: string,
  nombre_completo: string;
  identificacion: string;
  tipoOperario: string;
  Cargo: Cargo; // The key change here
  estado: string;
}