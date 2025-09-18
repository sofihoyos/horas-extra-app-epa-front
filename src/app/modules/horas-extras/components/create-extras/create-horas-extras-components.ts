// src/app/modules/horas-extras/create-horas-extras/create-horas-extras-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { Funcionario } from '../../../../interfaces/funcionario.interface';
import { HorasExtras } from '../../../../interfaces/horas-extras.interface';
import { HorasExtrasService } from '../../../../services/horas-extras.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-horas-extras-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './create-horas-extras-components.html',
  styleUrls: ['./create-horas-extras-components.css'],
})
export class CreateHorasExtrasComponent implements OnInit {
  nuevaHoraExtra: HorasExtras = {
    FuncionarioAsignado: null,
    fecha_inicio_trabajo: '',
    hora_inicio_trabajo: '',
    fecha_fin_trabajo: '',
    hora_fin_trabajo: '',
    fecha_inicio_descanso: '', // Inicializamos para el formulario
    hora_inicio_descanso: '', // Inicializamos para el formulario
    fecha_fin_descanso: '', // Inicializamos para el formulario
    hora_fin_descanso: '', // Inicializamos para el formulario
  };

  funcionarios: Funcionario[] = [];
  apiMessage: string = '';
  apiSuccess: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private horasExtrasService: HorasExtrasService
  ) {}

  ngOnInit(): void {
    this.cargarFuncionarios();
  }

  cargarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (response) => {
        if (response.success) {
          this.funcionarios = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar funcionarios:', err);
      },
    });
  }

  onSubmit(): void {
    this.apiMessage = '';

    // Si el usuario no ingresó datos de descanso, se eliminan del objeto para no enviarlos al backend.
    const datosAEnviar = { ...this.nuevaHoraExtra };
    console.log(datosAEnviar);
    

    this.horasExtrasService.crearExtras(datosAEnviar).subscribe({
      next: (response) => {
        if (response.success) {
          this.apiMessage = 'Registro exitoso al crear la hora extra.'; // Usamos el mensaje del backend
          this.apiSuccess = true;
          this.resetForm();
        } else {
          this.apiMessage = 'Error al crear la hora extra.';
          this.apiSuccess = false;
        }
      },
      error: (err) => {
        this.apiMessage = err.error.message || 'Error del servidor.';
        this.apiSuccess = false;
        console.error('Error completo:', err);
      },
    });
  }

  // Nuevo método para resetear el formulario
  resetForm(): void {
    this.nuevaHoraExtra = {
      FuncionarioAsignado: null,
      fecha_inicio_trabajo: '',
      hora_inicio_trabajo: '',
      fecha_fin_trabajo: '',
      hora_fin_trabajo: '',
      es_festivo_Inicio: false, 
      es_festivo_Fin: false,
      fecha_inicio_descanso: '',
      hora_inicio_descanso: '',
      fecha_fin_descanso: '',
      hora_fin_descanso: '',
    };
  }
}
