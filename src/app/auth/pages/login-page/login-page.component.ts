import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  const credentials: LoginRequest = { email: this.email, password: this.password };
  this.authService.login(credentials).subscribe({
    next: (res) => {
      if (res.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = res.message || 'Credenciales incorrectas';
      }
    },
    error: (err) => {
      this.error = err.error?.message || 'Error de conexión';
    }
  });
}
}