import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component ({
    selector: 'app-footer',
    imports: [
        CommonModule
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
    mostrarTerminos = false;

    abrirTerminos() {
        this.mostrarTerminos = true;
    }

    cerrarTerminos() {
        this.mostrarTerminos = false;
    }
}