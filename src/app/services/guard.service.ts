import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl = '/api/auth'; // Ajusta esto a la URL de tu API
  private tokenKey = 'authToken'; // Nombre de la clave para almacenar el token

  // Observable para notificar cambios en el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Verifica si hay un token almacenado
  public hasToken(): boolean {
    // Comprueba si existe un token en el localStorage.
    // Esto es lo que el guard revisará al inicio.
    return !!localStorage.getItem('token');
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    // Aquí iría tu llamada HTTP a la API.
    // Para el ejemplo, simularemos una respuesta exitosa.
    const loginSuccess = true;

    if (loginSuccess) {
      // Simula el guardado del token. En una app real, aquí se guarda el token recibido del backend.
      localStorage.setItem('token', 'mi-token-ejemplo-jwt');

      // Emite el nuevo estado: el usuario está autenticado.
      this._isAuthenticated.next(true);

      // Devuelve un Observable de éxito.
      return new Observable((observer) => observer.next({ success: true }));
    } else {
      // Si el login falla, emite el nuevo estado: no autenticado.
      this._isAuthenticated.next(false);
      return new Observable((observer) => observer.error({ success: false }));
    }
  }
  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false); // Notificar que el usuario ya no está autenticado
    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    // Puedes añadir lógica más compleja aquí, como verificar la validez del token con el backend
    return this.isAuthenticatedSubject.asObservable();
  }

  // Método para obtener el token (útil para las cabeceras de las peticiones)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
