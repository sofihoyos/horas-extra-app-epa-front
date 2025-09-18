import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HorasExtrasService } from '../../../../services/horas-extras.service';
import { HorasExtras } from '../../../../interfaces/horas-extras.interface';

@Component({
  selector: 'app-list-horas-extras',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './list-horas-extras.component.html',
  styleUrls: ['./list-horas-extras.component.css'],
})
export class ListHorasExtrasComponent implements OnInit {
  horasExtras: HorasExtras[] = [];
  apiMessage: string = '';
  apiSuccess: boolean = false;
  isLoading: boolean = false;

  mostrarModal = false;
  extraSeleccionada: HorasExtras | null = null;

  mostrarModalConfirmacion = false;
  idExtraAEliminar: string | null = null;

  // Propiedades para filtros
  filtroIdentificacion: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  constructor(private horasExtrasService: HorasExtrasService) {}

  ngOnInit(): void {
    this.getTodosLosRegistros();
  }

  // Método para obtener todos los registros sin filtro
  getTodosLosRegistros(): void {
    this.isLoading = true;
    this.horasExtrasService.getExtras().subscribe({
      next: (response) => {
        if (response.success) {
          this.horasExtras = response.data;
          this.apiMessage = '';
        } else {
          this.horasExtras = [];
          this.apiMessage = 'No se encontraron registros.';
          this.apiSuccess = false;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.horasExtras = [];
        this.apiMessage = 'Error al cargar los registros: ' + (err.error?.message || err.message);
        this.apiSuccess = false;
        console.error('Error al cargar registros:', err);
      },
    });
  }

  // Método para buscar por filtros
  buscarRegistros(): void {
    this.apiMessage = '';
    this.horasExtras = [];
    this.isLoading = true;

    // Lógica para determinar qué filtro usar
    if (this.filtroIdentificacion) {
      this.horasExtrasService.getExtrasByIdentificacion(this.filtroIdentificacion).subscribe({
        next: (response) => {
          this.manejarRespuestaBusqueda(response);
        },
        error: (err) => {
          this.manejarErrorBusqueda(err);
        },
      });
    } else if (this.filtroFechaInicio && this.filtroFechaFin) {
      this.horasExtrasService
        .getExtrasByFechas(this.filtroFechaInicio, this.filtroFechaFin)
        .subscribe({
          next: (response) => {
            this.manejarRespuestaBusqueda(response);
          },
          error: (err) => {
            this.manejarErrorBusqueda(err);
          },
        });
    } else {
      this.getTodosLosRegistros(); // Si no hay filtros, se listan todos
    }
  }

  private manejarRespuestaBusqueda(response: any): void {
    if (response.success) {
      this.horasExtras = response.data;
      this.apiMessage =
        response.data.length > 0 ? '' : 'No se encontraron registros para la búsqueda.';
      this.apiSuccess = true;
    } else {
      this.horasExtras = [];
      this.apiMessage = response.message || 'Error en la búsqueda.';
      this.apiSuccess = false;
    }
    this.isLoading = false;
  }

  private manejarErrorBusqueda(err: any): void {
    this.isLoading = false;
    this.horasExtras = [];
    this.apiMessage = err.error?.message || 'Error del servidor al buscar registros.';
    this.apiSuccess = false;
    console.error('Error en la búsqueda:', err);
  }

  // Método para exportar a Excel
  exportarExcel(): void {
    this.horasExtrasService
      .exportarExtrasExcel(this.filtroIdentificacion, this.filtroFechaInicio, this.filtroFechaFin)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = url;
          a.download = 'Reporte_Horas_Extras.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.apiMessage = 'Reporte Excel generado exitosamente.';
          this.apiSuccess = true;
        },
        error: (err) => {
          this.apiMessage = 'Error al generar el archivo Excel.';
          this.apiSuccess = false;
          console.error('Error al exportar Excel:', err);
        },
      });
  }

  abrirModal(extra: HorasExtras) {
    this.extraSeleccionada = { ...extra }; // Clonar el objeto para no modificar la tabla directamente
    this.mostrarModal = true;
    this.apiMessage = ''; // Limpiar mensajes
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.extraSeleccionada = null;
  }

  actualizarHoraExtra() {
    if (!this.extraSeleccionada || !this.extraSeleccionada._id) {
      this.apiMessage = 'Error: No se ha seleccionado un registro válido para actualizar.';
      this.apiSuccess = false;
      return;
    }

    const id = this.extraSeleccionada._id;
    const datosActualizados: Partial<HorasExtras> = {
      fecha_inicio_trabajo: this.extraSeleccionada.fecha_inicio_trabajo,
      hora_inicio_trabajo: this.extraSeleccionada.hora_inicio_trabajo,
      fecha_fin_trabajo: this.extraSeleccionada.fecha_fin_trabajo,
      hora_fin_trabajo: this.extraSeleccionada.hora_fin_trabajo,
    };

    console.log('Enviando para actualizar:', { id: this.extraSeleccionada._id, datosActualizados });

    // Aquí es donde se llama a tu función 'updateFuncionario' del servicio
    this.horasExtrasService.actualizarExtras(id, datosActualizados).subscribe({
      next: (response) => {
        if (response.success) {
          this.apiMessage = 'Hora Extra actualizado con éxito.';
          this.apiSuccess = true;
          this.getTodosLosRegistros(); // Recargar la lista para ver los cambios
          this.cerrarModal(); // Cerrar el modal al finalizar
        } else {
          this.apiMessage = 'Error al actualizar la hora extra.';
          this.apiSuccess = false;
        }
      },
      error: (error) => {
      console.error('Error al actualizar:', error);

      if (error.error && error.error.message) {
        this.apiMessage = `Error del servidor: ${error.error.message}`;
      } else if (error.message) {
        this.apiMessage = `Error: ${error.message}`;
      } else {
        this.apiMessage = 'Ocurrió un error inesperado al actualizar.';
      }
      this.apiSuccess = false;
    },
    });
  }

  abrirModalConfirmacion(id: string): void {
  this.idExtraAEliminar = id;
  this.mostrarModalConfirmacion = true;
  this.apiMessage = ''; // Limpia el mensaje anterior
}

// Método para cancelar y cerrar el modal
cancelarEliminacion(): void {
  this.mostrarModalConfirmacion = false;
  this.idExtraAEliminar = null;
}

// Método que se ejecuta al confirmar la eliminación
confirmarEliminacion(): void {
  // Asegúrate de que tienes un ID para eliminar
  if (!this.idExtraAEliminar) {
    this.apiMessage = 'Error: No se ha seleccionado un registro para eliminar.';
    this.apiSuccess = false;
    this.cancelarEliminacion();
    return;
  }

  // Llama al servicio para eliminar el registro
  this.horasExtrasService.eliminarExtras(this.idExtraAEliminar).subscribe({
    next: (response) => {
      if (response.success) {
        this.apiMessage = 'Registro eliminado correctamente.';
        this.apiSuccess = true;
        this.getTodosLosRegistros(); // Recarga la lista
      } else {
        this.apiMessage = 'Error al eliminar el registro.';
        this.apiSuccess = false;
      }
      this.cancelarEliminacion(); // Cierra el modal de confirmación
    },
    error: (err) => {
      this.apiMessage = err.error?.message || 'Error en el servidor al intentar eliminar.';
      this.apiSuccess = false;
      console.error('Error al eliminar registro:', err);
      this.cancelarEliminacion(); // Cierra el modal de confirmación
    },
  });
}
}
