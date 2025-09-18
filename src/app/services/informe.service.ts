import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { InformeFromServer, InformeToCreate } from '../interfaces/informe.interface';
import { ApiResponse } from '../interfaces/api.responsive.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { Funcionario } from '../interfaces/funcionario.interface';

@Injectable({
  providedIn: 'root',
})
export class InformeService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Este método maneja el API de creación. El payload debe coincidir
  createInforme(informe: InformeToCreate): Observable<ApiResponse<InformeToCreate>> {
    return this.http
      .post<ApiResponse<InformeToCreate>>(`${this.apiUrl}/reporte/crear`, informe)
      .pipe(catchError(this.handleError));
  }

  // Este método maneja el API de listado
  getInforme(): Observable<ApiResponse<InformeFromServer[]>> {
    return this.http
      .get<ApiResponse<InformeFromServer[]>>(`${this.apiUrl}/reporte/listar`)
      .pipe(catchError(this.handleError));
  }

  /// Actualizar por ID
  exportInforme(informe: any): Observable<ApiResponse<InformeFromServer>> {
    return this.http
      .put<ApiResponse<InformeFromServer>>(`${this.apiUrl}/reporte/exportar`, informe)
      .pipe(catchError(this.handleError));
  }

  getFuncionarios(): Observable<ApiResponse<Funcionario[]>> {
    return this.http.get<ApiResponse<Funcionario[]>>(`${this.apiUrl}/cargos/listar`);
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
