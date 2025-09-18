import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../interfaces/api.responsive.interface';
import { HorasExtras } from '../interfaces/horas-extras.interface';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {
  private apiUrl = `${environment.apiUrl}/extras`;

  constructor(private http: HttpClient) { }

  /**
   * Crea un nuevo registro de horas extras.
   * @param horasExtras Los datos del formulario de horas extras.
   * @returns Un Observable con la respuesta del API.
   */
  crearExtras(horasExtras: HorasExtras): Observable<ApiResponse<HorasExtras>> {
    return this.http.post<ApiResponse<HorasExtras>>(`${this.apiUrl}/crear`, horasExtras);
  }

  /**
   * Actualiza un registro de horas extras por su ID.
   * @param id El ID del registro a actualizar.
   * @param horasExtras Los datos a modificar.
   * @returns Un Observable con la respuesta del API.
   */
  actualizarExtras(id: string, horasExtras:  Partial<HorasExtras>): Observable<ApiResponse<HorasExtras>> {
    return this.http.put<ApiResponse<HorasExtras>>(`${this.apiUrl}/update/${id}`, horasExtras);
  }

  /**
   * Elimina un registro de horas extras por su ID.
   * @param id El ID del registro a eliminar.
   * @returns Un Observable con la respuesta del API.
   */
  eliminarExtras(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Obtiene todos los registros de horas extras.
   * @returns Un Observable con la lista de registros.
   */
  getExtras(): Observable<ApiResponse<HorasExtras[]>> {
    return this.http.get<ApiResponse<HorasExtras[]>>(`${this.apiUrl}/listar`);
  }
  
  /**
   * Obtiene los registros de horas extras por identificación de funcionario.
   * @param identificacion La identificación del funcionario.
   * @returns Un Observable con la lista de registros.
   */
  getExtrasByIdentificacion(identificacion: string): Observable<ApiResponse<HorasExtras[]>> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<ApiResponse<HorasExtras[]>>(`${this.apiUrl}/funcionario`, { params });
  }

  /**
   * Obtiene los registros de horas extras por rango de fechas.
   * @param fechaInicio La fecha de inicio del filtro.
   * @param fechaFin La fecha de fin del filtro.
   * @returns Un Observable con la lista de registros.
   */
  getExtrasByFechas(fechaInicio: string, fechaFin: string): Observable<ApiResponse<HorasExtras[]>> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<ApiResponse<HorasExtras[]>>(`${this.apiUrl}/fechas`, { params });
  }

  /**
   * Descarga un archivo Excel con el reporte de horas extras.
   * @param identificacion (Opcional) La identificación del funcionario para filtrar.
   * @param fechaInicio (Opcional) La fecha de inicio del filtro.
   * @param fechaFin (Opcional) La fecha de fin del filtro.
   * @returns Un Observable con el blob del archivo Excel.
   */
  exportarExtrasExcel(identificacion?: string, fechaInicio?: string, fechaFin?: string): Observable<Blob> {
    let params = new HttpParams();

    if (identificacion) {
      params = params.set('identificacion', identificacion);
    }
    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.set('fechaFin', fechaFin);
    }
    
    return this.http.get(`${this.apiUrl}/exportar`, { params, responseType: 'blob' });
  }
}