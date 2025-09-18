import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioEventsService {
  // Un 'Subject' es un tipo de Observable que permite enviar valores a sus suscriptores.
  private funcionarioAddedSource = new Subject<void>();

  // Esto es un Observable que otros componentes pueden suscribir.
  cargoAdded$ = this.funcionarioAddedSource.asObservable();

  constructor() { }

  // Este método será llamado por el componente del formulario
  notifyCargoAdded(): void {
    this.funcionarioAddedSource.next();
  }
}