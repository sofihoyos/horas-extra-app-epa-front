import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InformeFromServer, InformeToCreate } from '../../../interfaces/informe.interface';
import { InformeService } from '../../../services/informe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../interfaces/api.responsive.interface';
import { Funcionario } from '../../../interfaces/funcionario.interface';

@Component({
  selector: 'app-create-informe',
  standalone: true, // Si es un componente standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './create-informe.component.html',
  styleUrl: './create-informe.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInformeComponent implements OnInit {
  informes: InformeFromServer[] = [];
  funcionarios: Funcionario[] = [];
  isLoading = true;
  error: string | null = null;

  // 👉 Usamos InformeToCreate para la estructura del formulario
  newInforme: InformeToCreate = {
    fechaInicio: '',
    fechaFin: '',
    tipoOperario: '',
  };

  constructor(
    private informeService: InformeService,
  ) {}

  ngOnInit(): void {
    this.getInformes(); // 👈 Cargar la tabla al iniciar el componente
    this.getFuncionarios();
  }

  getInformes() {
    this.isLoading = true;
    this.error = null;
    this.informeService.getInforme().subscribe({ 
      next: (response: ApiResponse<InformeFromServer[]>) => {
        if (response.success) {
          this.informes = response.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los informes.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  getFuncionarios() {
    this.informeService.getFuncionarios().subscribe({
      next: (response) => {
        if (response.success) {
          this.funcionarios = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar los cargos:', err);
      },
    });
  }

  saveInforme() {
    this.informeService.createInforme(this.newInforme).subscribe({
      next: (response) => { 
        console.log('Informe guardado:', response.data);
        // Limpiar el formulario
        this.newInforme = {
          fechaInicio: '',
          fechaFin: '',
          tipoOperario: '',
        };
      },
      error: (err) => {
        console.error('Error al guardar el funcionario:', err);
      },
    });
  }
}