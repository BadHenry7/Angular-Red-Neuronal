import { Component } from '@angular/core';
import {NavbarIndexComponent} from '../../Components/navbar-index/navbar-index.component'
import {FooterComponent} from '../../Components/footer/footer.component'

@Component({
  selector: 'app-acerca-de',
  imports: [FooterComponent,NavbarIndexComponent],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {

}
