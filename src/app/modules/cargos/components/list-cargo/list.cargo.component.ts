import { Component, OnDestroy, OnInit } from '@angular/core';
import { CargoService } from '../../../../services/cargo.service';
import { Cargo } from '../../../../interfaces/cargo.interface';
import { ApiResponse } from '../../../../interfaces/api.responsive.interface'; // Asegúrate de importar esta interfaz
import { CommonModule } from '@angular/common';
import { CargoEventsService } from '../../../../services/events/cargo-events.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-cargo-page',
  imports: [CommonModule],
  templateUrl: './list.cargo.component.html',
  styleUrls: ['./list.cargo.component.css']
})
export class ListCargoComponent implements OnInit, OnDestroy {
  cargos: any[] = [];
  isLoading = true;
  error: string | null = null;
  private cargoAddedSubscription: Subscription | null = null; // Inicialización para evitar el error de TypeScript

  constructor(
    private cargoService: CargoService,
    private cargoEventsService: CargoEventsService // <-- Inyecta el servicio de eventos
  ) {}

  ngOnInit(): void {
    this.getCargos();

    // Se suscribe al evento y recarga la lista cuando el formulario notifique un cambio
    this.cargoAddedSubscription = this.cargoEventsService.cargoAdded$.subscribe(() => {
      this.getCargos();
    });
  }

  ngOnDestroy(): void {
    // Es importante limpiar la suscripción al destruir el componente
    if (this.cargoAddedSubscription) {
      this.cargoAddedSubscription.unsubscribe();
    }
  }

  getCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (response) => {
        // Asegúrate de que 'response' tenga la propiedad 'data'
        this.cargos = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los cargos.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}