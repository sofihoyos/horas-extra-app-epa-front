import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router'; 
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './verify-code.component.html',
//   styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  email: string = '';
  codigo: string = '';
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
    });
  }

  verificarCodigo(): void {
    if (!this.email || !this.codigo) {
      this.apiMessage = 'Por favor, ingrese el correo y el código.';
      this.apiSuccess = false;
      return;
    }

    this.isLoading = true;
    this.apiMessage = '';

    this.loginService.verificarCodigo(this.email, this.codigo).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.ok) {
          console.log('Se envio un codigo al correo');
          
          this.apiMessage =response.msg || 'Código verificado con éxito.';
          this.apiSuccess = true;
          // Redirige al usuario al componente de restablecer contraseña,
          // pasando el correo para el siguiente paso.
          this.router.navigate(['/reset-password'], {
            queryParams: { email: this.email, codigo: this.codigo },
          });
        } else {
          this.apiMessage = response.msg || 'Código incorrecto.';
          this.apiSuccess = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.apiMessage =
          err.error?.msg || 'Error en el servidor al verificar el código.';
        this.apiSuccess = false;
      },
    });
  }
}