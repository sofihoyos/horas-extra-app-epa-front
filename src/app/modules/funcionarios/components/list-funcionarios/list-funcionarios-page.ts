import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { FuncionarioService } from '../../../../services/funcionario.service';
import { Funcionario } from '../../../../interfaces/funcionario.interface';
import { ApiResponse } from '../../../../interfaces/api.responsive.interface';
import { Cargo } from '../../../../interfaces/cargo.interface'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-funcionarios-page',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './list-funcionarios-page.html',
  styleUrls: ['./list-funcionarios-page.css'],
})
export class ListFuncionariosComponent implements OnInit {
  mostrarModal = false;
  funcionarioSeleccionado: Funcionario | null = null;
  funcionariosFiltrados: Funcionario[] = [];
  filtroEstado: string = '';
  errorMessage: string = '';
  funcionarios: Funcionario[] = [];
  isLoading = true;
  error: string | null = null;

  apiMessage: string = '';
  apiSuccess: boolean = false;

  cargos: Cargo[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.getFuncionarios();
    this.funcionarioService.getFuncionariosActivos().subscribe({
      next: (res) => {
        if (res.success) {
          this.funcionarios = res.data; // lista solo los activos
        }
      },
      error: (err) => {
        console.error('Error al obtener funcionarios activos:', err);
      },
    });
    this.getCargos();
  }

   getCargos() {
    this.funcionarioService.getCargos().subscribe({
      next: (response) => {
        if (response.success) {
          this.cargos = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar los cargos:', err);
      }
    });
  }

  compararCargos(cargo1: any, cargo2: any): boolean {
    if (cargo1 && cargo2) {
      return cargo1._id === cargo2._id;
    }
    return false;
  }

  // OBTENER FUNCIONARIOS
  getFuncionarios() {
    this.isLoading = true;
    this.funcionarioService.getFuncionarios().subscribe({
      next: (response: ApiResponse<Funcionario[]>) => {
        this.funcionarios = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los funcionarios.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  // OBTENER FUNCIONARIO POR ID
  getFuncionarioById(identificacion: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.funcionarioService.getFuncionarioById(identificacion).subscribe({
      next: (response) => {
        const funcionario = response.data || response;
        this.funcionarios = funcionario ? [funcionario] : [];
        this.isLoading = false;
        console.log('Funcionario encontrado:', funcionario);
      },
      error: (error) => {
        console.error('Error al obtener funcionario:', error);
        this.errorMessage = error.message || 'Funcionario no encontrado';

        // Si hay error, limpiar la tabla
        this.funcionarios = [];

        this.isLoading = false;
      },
    });
  }

  //  CARGAR SOLO FUNCIONARIOS ACTIVOS
  loadFuncionariosActivos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.funcionarioService.getFuncionariosActivos().subscribe({
      next: (response) => {
        this.funcionarios = response.data;
        this.funcionariosFiltrados = [...this.funcionarios];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al cargar funcionarios activos';
        this.isLoading = false;
      },
    });
  }

// --- Funcionalidad del Modal de Actualización ---

  // Abrir modal y cargar datos del funcionario
  abrirModal(funcionario: Funcionario) {
    this.funcionarioSeleccionado = { ...funcionario }; // Clonar el objeto para no modificar la tabla directamente
    this.mostrarModal = true;
    this.apiMessage = ''; // Limpiar mensajes
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
    this.funcionarioSeleccionado = null;
  }

  // Enviar los datos actualizados
  actualizarFuncionario() {
  if (!this.funcionarioSeleccionado || !this.funcionarioSeleccionado._id) {
    this.apiMessage = 'Error: No se ha seleccionado un funcionario para actualizar.';
    this.apiSuccess = false;
    return;
  }

  const id = this.funcionarioSeleccionado._id;
  const datosActualizados = {
    nombre_completo: this.funcionarioSeleccionado.nombre_completo,
    identificacion: this.funcionarioSeleccionado.identificacion,
    tipoOperario: this.funcionarioSeleccionado.tipoOperario,
    Cargo: this.funcionarioSeleccionado.Cargo._id,
    estado: this.funcionarioSeleccionado.estado,
  };

  // Aquí es donde se llama a tu función 'updateFuncionario' del servicio
  this.funcionarioService.updateFuncionario(id, datosActualizados).subscribe({
    next: (response) => {
      if (response.success) {
        this.apiMessage = 'Funcionario actualizado con éxito.';
        this.apiSuccess = true;
        this.getFuncionarios(); // Recargar la lista para ver los cambios
        this.cerrarModal(); // Cerrar el modal al finalizar
      } else {
        this.apiMessage = 'Error al actualizar el funcionario.';
        this.apiSuccess = false;
      }
    },
    error: (error) => {
      // Manejo de errores de la API, usando la información del backend
      this.apiMessage = error.error.message || 'Error en la conexión con el servidor.';
      this.apiSuccess = false;
      console.error('Error al actualizar:', error);
    },
  });
}


}
