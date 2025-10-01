import { Component } from '@angular/core';
import {NavbarindexComponent} from '../../Componentes/navbarindex/navbarindex.component'
import {FooterComponent} from '../../Componentes/footer/footer.component'
import { SlideComponent } from '../../Componentes/slide/slide.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [NavbarindexComponent, FooterComponent, SlideComponent, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private router: Router) {}

  redirigir(){
    const v_citas = "redireccion"; 
    localStorage.setItem("Redirigir", v_citas); 
    this.router.navigate(['/Login']);
  }
}
