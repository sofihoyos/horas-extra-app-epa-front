import { Component } from '@angular/core';
import { CargoService } from '../../../../services/cargo.service';
import { CargoEventsService } from '../../../../services/events/cargo-events.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';


@Component({
  selector: 'app-crear-cargo-page',
  imports: [FormsModule],
  templateUrl: './create-cargo-page.html',
  styleUrl: './create-cargo-page.css'
})
export class CreateCargoComponent {
  newCargo = { name: '' };

  constructor(
    private cargoService: CargoService,
    private cargoEventsService: CargoEventsService,
    private notify: NotificationService
  ) { }

  saveCargo(): void {
    if (this.newCargo.name.trim() === '') {
      return;
    }

    this.cargoService.createCargo(this.newCargo).subscribe({
      next: (response: any) => { // <-- Se puede tipificar como 'any' o un tipo específico
        console.log('Cargo guardado:', response);
        this.newCargo.name = '';
        this.cargoEventsService.notifyCargoAdded();
      },
      error: (err: any) => { // <-- Se puede tipificar como 'any' o 'HttpErrorResponse'
        console.error('Error al guardar el cargo:', err);
      }
    });
  }

  guardar() {
    try {
      // Aquí simulas el guardado
      const exito = Math.random() > 0.5; // 50% chance de error

      if (exito) {
        this.notify.showSuccess('✅ Guardado exitosamente');
      } else {
        throw new Error('Error al guardar en la base de datos');
      }
    } catch (e) {
      this.notify.showError('❌ Ocurrió un error al guardar');
    }
  }
}