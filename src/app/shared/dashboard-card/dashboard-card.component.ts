import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dashboard-card', 
  standalone: true,
  imports:[ RouterModule, MatIconModule],
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @Input() titulo: string = '';
  @Input() routerLink: string = '';
  @Input() textoBoton: string = '';
  @Input() nameIcon: string = '';
}