import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { LoginService } from "../../../services/login.service";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component ({
    selector: 'app-navbar',
    imports: [CommonModule, MatIcon],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})

export class NavbarComponent {
    @ViewChild('menuContainer') menuContainer: ElementRef | undefined;
    mostrarMenuUsuario = false;

  constructor(private loginService: LoginService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Si el clic no fue dentro del contenedor del menú, lo cierra
    if (this.menuContainer && !this.menuContainer.nativeElement.contains(event.target)) {
      this.mostrarMenuUsuario = false;
    }
  }

  // Se activa al hacer clic en el ícono de usuario
  toggleMenu(event: MouseEvent): void {
    // Esto evita que el clic en el ícono cierre el menú inmediatamente
    event.stopPropagation(); 
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  // Este método llama a la función de cierre de sesión
  cerrarSesion(): void {
    this.loginService.logout();
    this.mostrarMenuUsuario = false; // Oculta el menú después de la acción
  }

  
}