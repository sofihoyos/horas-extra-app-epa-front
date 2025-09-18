import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FuncionarioService } from '../../../../services/funcionario.service';
import { Funcionario } from '../../../../interfaces/funcionario.interface';
import { CargoService } from '../../../../services/cargo.service';
import { Cargo } from '../../../../interfaces/cargo.interface';

@Component({
  selector: 'app-crear-funcionario-page',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './create-funcionarios-page.html',
  styleUrls: ['./create-funcionarios-page.css'],
})
export class CreateFuncionariosComponent implements OnInit {
  
  newFuncionario: Funcionario = {
    nombre_completo: '',
    identificacion: '',
    tipoOperario: '',
    Cargo:{} as Cargo, 
    estado: 'Activo'
  };
  cargos: Cargo[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.getCargos();
  }

  getCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (response) => {
        this.cargos = response.data;
      },
      error: (err) => {
        console.error('Error al cargar los cargos:', err);
      }
    });
  }

  saveFuncionario() {
    this.funcionarioService.createFuncionario(this.newFuncionario).subscribe({
      next: (response) => {
        console.log('Funcionario guardado:', response.data);
        // Limpiar el formulario y resetear el estado
        this.newFuncionario = {
          nombre_completo: '',
          identificacion: '',
          tipoOperario: '',
          Cargo: {} as Cargo,
          estado: 'Activo'
        };
      },
      error: (err) => {
        console.error('Error al guardar el funcionario:', err);
      },
    });
  }
}