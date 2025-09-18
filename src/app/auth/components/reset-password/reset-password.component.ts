import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';
  isLoading: boolean = false;
  apiMessage: string = '';
  apiSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtiene el correo electrónico de los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      if (!this.email) {
        // Redirige al login si no hay correo, lo que previene accesos directos no deseados
        this.router.navigate(['/login']);
      }
    });
  }

  restablecerContrasena(): void {
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.apiMessage = 'Por favor, complete ambos campos.';
      this.apiSuccess = false;
      return;
    }
    if (this.nuevaPassword !== this.confirmarPassword) {
      this.apiMessage = 'Las contraseñas no coinciden.';
      this.apiSuccess = false;
      return;
    }

    this.isLoading = true;
    this.apiMessage = '';

    this.loginService.restablecerPassword(this.confirmarPassword, this.nuevaPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.ok) {
          this.apiMessage = 'Contraseña actualizada con éxito.';
          this.apiSuccess = true;
          // Redirige al usuario al login después de un breve momento
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.apiMessage = response.msg || 'Error al restablecer la contraseña.';
          this.apiSuccess = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.apiMessage = err.error?.msg || 'Error en el servidor al restablecer la contraseña.';
        this.apiSuccess = false;
      },
    });
  }
}