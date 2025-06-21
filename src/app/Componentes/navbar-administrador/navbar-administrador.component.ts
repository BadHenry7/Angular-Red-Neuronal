import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar-administrador',
  imports: [RouterLink],
  templateUrl: './navbar-administrador.component.html',
  styleUrl: './navbar-administrador.component.css'
})
export class NavbarAdministradorComponent {
 henry : boolean= true
  image : String=''
}
