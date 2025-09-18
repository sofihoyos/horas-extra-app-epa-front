import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; // Asegúrate de importar NavigationEnd
import { filter } from 'rxjs/operators';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-cargos',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardCardComponent, MatIconModule],
  templateUrl: './dashboard-cargos.html',
  styleUrls: ['../../app.css']
})
export class DashboardCargosComponent {
  isBaseRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // La URL completa del navegador
        const fullUrl = this.router.url;
        // La URL base que tiene que coincidir, sin la parte del MainLayout
        const baseRoute = '/dashboard/cargos';
        
        // Compara la URL actual con la ruta base
        this.isBaseRoute = fullUrl === baseRoute;
      });
  }
}