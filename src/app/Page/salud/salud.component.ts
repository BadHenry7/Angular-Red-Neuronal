import { Component } from '@angular/core';
import { NavbarindexComponent } from '../../Componentes/navbarindex/navbarindex.component';
import { FooterComponent } from '../../Componentes/footer/footer.component';

@Component({
  selector: 'app-salud',
  imports: [NavbarindexComponent, FooterComponent],
  templateUrl: './salud.component.html',
  styleUrl: './salud.component.css'
})
export class SaludComponent {

}
