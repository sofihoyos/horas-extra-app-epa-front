import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from '../../services/guard.service'; // Asegúrate de que la ruta sea correcta
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: GuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Pregunta al servicio de autenticación si el usuario está logueado.
    if (this.authService.hasToken()) {
      // Si el token existe, permite el acceso.
      return true;
    } else {
      // Si no hay token, redirige a la página de login y evita el acceso.
      return this.router.createUrlTree(['/login']);
    }
  }
}