import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('horas-extra-app-epa-front');
}
