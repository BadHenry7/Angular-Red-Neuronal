import { Component } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';

@Component({
  selector: 'app-administrador-principal',
  imports: [NavbarAdministradorComponent],
  templateUrl: './administrador-principal.component.html',
  styleUrl: './administrador-principal.component.css'
})
export class AdministradorPrincipalComponent {
  henry : boolean= true
  image : String=''

}
