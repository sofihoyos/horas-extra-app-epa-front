import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/auth/new`; 

  constructor(private http: HttpClient) { }

  register(registerData: RegisterRequest): Observable<any> {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    console.log('Token encontrado:', token); // Para debug
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    // Crear headers con el token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log('Headers enviados:', headers.get('Authorization')); // Para debug

    return this.http.post<any>(this.apiUrl, registerData, { headers });
  }
}