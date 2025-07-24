import { Component } from '@angular/core';
import { NavbarPacienteComponent } from "../../../Componentes/navbar-paciente/navbar-paciente.component";
import {ChatboxComponent} from '../../../Componentes/chatbox/chatbox.component'
@Component({
  selector: 'app-paciente-principal',
  imports: [NavbarPacienteComponent, ChatboxComponent],
  templateUrl: './paciente-principal.component.html',
  styleUrl: './paciente-principal.component.css'
})
export class PacientePrincipalComponent {

}
