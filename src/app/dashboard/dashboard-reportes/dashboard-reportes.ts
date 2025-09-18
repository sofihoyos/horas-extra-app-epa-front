import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; // Asegúrate de importar NavigationEnd
import { filter } from 'rxjs/operators';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';
import { CreateInformeComponent } from "../../modules/informes/create-informe/create-informe.component";

@Component({
  selector: 'app-dashboard-reportes',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateInformeComponent],
  templateUrl: './dashboard-reportes.html',
  styleUrls: ['../../app.css']
})
export class DashboardReportesComponent {
  
}