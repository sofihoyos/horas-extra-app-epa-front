import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Agregar HttpHeaders
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        // Guardar token cuando el login sea exitoso
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshtoken);
          localStorage.setItem('uid', response.uid);
          localStorage.setItem('userName', response.name);
          localStorage.setItem('userRole', response.rol);
        }
      })
    );
  }

  renewToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/renew`);
  }

  // Métodos adicionales útiles
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    const refreshtoken = localStorage.getItem('refreshToken');
    const token = this.getToken();

    if (refreshtoken && token) {
      // Crear headers con x-token
      const headers = new HttpHeaders({
        'x-token': token,
      });

      console.log(headers);

      const requestBody = { refreshtoken: refreshtoken };
      console.log(requestBody);

      this.http.post(`${this.apiUrl}/logout`, requestBody, { headers }).subscribe({
        next: () => {
          console.log('Sesion Cerrada con exito');
        },
        error: (err) => {
          console.error('Error al cerrar sesion: ', err);
        },
        complete: () => {
          this.performClientSideLogout();
        },
      });
    } else {
      console.warn('No refresh token or token found. Performing client-side logout only.');
      this.performClientSideLogout();
    }
  }
  private performClientSideLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  solicitarReiniciarPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitarReset`, { email });
  }

  verificarCodigo(email: string, codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verificarCodigo`, { email, codigo });
  }

  restablecerPassword(confirmarPassword: string, nuevaPassword: string): Observable<any> {
    const resetToken = localStorage.getItem('resetToken'); // Token del proceso anterior

    if (resetToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-reset-token': resetToken, // o 'Authorization': `Bearer ${resetToken}`
      });

      return this.http.post(
        `${this.apiUrl}/resetPassword`,
        { confirmarPassword, nuevaPassword },
        { headers }
      );
    }

    return this.http.post(`${this.apiUrl}/resetPassword`, { confirmarPassword, nuevaPassword });
  }
}
