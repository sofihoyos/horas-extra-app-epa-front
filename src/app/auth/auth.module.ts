import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  imports: [CommonModule, FormsModule, LoginPageComponent], // <-- agrega el componente aquí
  exports: [LoginPageComponent]
})
export class AuthModule {}