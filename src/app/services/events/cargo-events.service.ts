import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoEventsService {
  // Un 'Subject' es un tipo de Observable que permite enviar valores a sus suscriptores.
  private cargoAddedSource = new Subject<void>();

  // Esto es un Observable que otros componentes pueden suscribir.
  cargoAdded$ = this.cargoAddedSource.asObservable();

  constructor() { }

  // Este método será llamado por el componente del formulario
  notifyCargoAdded(): void {
    this.cargoAddedSource.next();
  }
}