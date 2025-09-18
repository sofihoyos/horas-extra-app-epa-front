import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../interfaces/api.responsive.interface';
import { Cargo } from '../interfaces/cargo.interface'; 

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  // Usaremos la URL base para cargos
  private apiBaseUrl = `${environment.apiUrl}/cargos`;

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de cargos
  // Tu backend espera GET en /api/cargos/listar
  getCargos(): Observable<ApiResponse<Cargo[]>> {
    return this.http.get<ApiResponse<Cargo[]>>(`${this.apiBaseUrl}/listar`);
  }

  // Método para crear un nuevo cargo
  // Tu backend espera POST en /api/cargos/crearCargo
  createCargo(cargo: { name: string }): Observable<any> {
    return this.http.post<ApiResponse<Cargo>>(`${this.apiBaseUrl}/crearCargo`, cargo);
  }
}