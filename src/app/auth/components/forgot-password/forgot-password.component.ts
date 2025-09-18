import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service'; // Asegúrate de tener este servicio
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './forgot-password.component.html',
  //   styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  apiMessage: string = '';
  apiSuccess: boolean = false;

  constructor(private loginService: LoginService, private router: Router,) {}

  solicitarCodigo(): void {
    if (!this.email) {
      this.apiMessage = 'Por favor, ingrese un correo electrónico.';
      this.apiSuccess = false;
      return;
    }

    this.isLoading = true;
    this.apiMessage = '';

    this.loginService.solicitarReiniciarPassword(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.ok) {
          console.log('Se ha enviado un código a su correo electrónico.');
          
          this.apiMessage = response.msg || 'Se ha enviado un código a su correo electrónico.';
          this.apiSuccess = true;
          // Aquí puedes redirigir al usuario al componente de verificación del código
          this.router.navigate(['/verify-code'], { queryParams: { email: this.email } });
        } else {
          console.log(this.email);
          
          this.apiMessage = response.msg || 'Error al solicitar el código.';
          this.apiSuccess = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.apiMessage = err.error?.msg || 'Error en el servidor al solicitar el código.';
        this.apiSuccess = false;
      },
    });
  }
}
