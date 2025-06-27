import { Component } from '@angular/core';
import {NavbarindexComponent} from '../../Componentes/navbarindex/navbarindex.component'
import {FooterComponent} from '../../Componentes/footer/footer.component'

@Component({
  selector: 'app-acerca-de',
  imports: [NavbarindexComponent, FooterComponent],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {

  ngOnInit() {
  window.scrollTo(0, 0);
}

}


