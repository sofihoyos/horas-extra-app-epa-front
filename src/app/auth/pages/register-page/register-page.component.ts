import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';
import { RegisterRequest } from '../../../interfaces/register-request.interface';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  rol: string = '';
  mensaje: string = '';
  error: string = '';

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    // ✅ Validación de campos vacíos
    if (!this.name || !this.email || !this.password || !this.rol ) {
      this.error = 'Todos los campos son obligatorios';
      this.mensaje = '';
      return;
    }

    const registerData: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.registerService.register(registerData).subscribe({
      next: (res) => {
        console.log('Usuario creado:', res);
        this.mensaje = 'Usuario registrado con éxito';
        this.error = '';

        // ✅ Opcional: limpiar formulario
        this.name = '';
        this.email = '';
        this.password = '';
        this.rol = '';
      },
      error: (err) => {
        console.error('Error en registro', err);
        this.error = 'No se pudo registrar el usuario';
        this.mensaje = '';
      }
    });
  }
}
