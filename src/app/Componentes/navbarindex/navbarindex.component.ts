import { Component } from '@angular/core';
import {RouterLink} from '@angular/router' 
import {HeaderComponent} from '../../Componentes/header/header.component'
@Component({
  selector: 'app-navbarindex',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './navbarindex.component.html',
  styleUrl: './navbarindex.component.css'
})
export class NavbarindexComponent {

}
