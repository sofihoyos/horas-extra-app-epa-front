import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { Funcionario } from '../interfaces/funcionario.interface';
import { ApiResponse } from '../interfaces/api.responsive.interface';
import { Cargo } from '../interfaces/cargo.interface'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  // Este método maneja el API de creación. El payload debe coincidir
  createFuncionario(funcionario: Funcionario): Observable<ApiResponse<Funcionario>> {
    return this.http.post<ApiResponse<Funcionario>>(`${this.apiUrl}/funcionario/crearfuncionario`, funcionario)
    .pipe(catchError(this.handleError));
  }

  // Este método maneja el API de listado
  getFuncionarios(): Observable<ApiResponse<Funcionario[]>> {
    return this.http.get<ApiResponse<Funcionario[]>>(`${this.apiUrl}/funcionario`)
    .pipe(catchError(this.handleError));
  }

  /// Actualizar por ID
  updateFuncionario(id: string, funcionario: any): Observable<ApiResponse<Funcionario>> {
    return this.http.put<ApiResponse<Funcionario>>(`${this.apiUrl}/funcionario/actualizar/${id}`, funcionario)
      .pipe(catchError(this.handleError));
  }

  getCargos(): Observable<ApiResponse<Cargo[]>> {
    return this.http.get<ApiResponse<Cargo[]>>(`${this.apiUrl}/cargos/listar`);
  }

  // Obtener funcionario por ID
  getFuncionarioById(identificacion: string): Observable<ApiResponse<Funcionario>> {
    return this.http.get<ApiResponse<Funcionario>>(`${this.apiUrl}/funcionario/obtener/${identificacion}`)
      .pipe(catchError(this.handleError));
  }

  // Listar funcionarios activos
  getFuncionariosActivos(): Observable<ApiResponse<Funcionario[]>> {
    return this.http.get<ApiResponse<Funcionario[]>>(`${this.apiUrl}/funcionario/activos`)
      .pipe(catchError(this.handleError));
  }

  

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'No se pudo conectar al servidor';
          break;
        case 400:
          errorMessage = 'Solicitud inválida';
          break;
        case 401:
          errorMessage = 'No autorizado';
          break;
        case 404:
          errorMessage = 'Funcionario no encontrado';
          break;
        case 409:
          errorMessage = 'Conflicto: El funcionario ya existe';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}