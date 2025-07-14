import { Component } from '@angular/core';
import { NavbarPacienteComponent } from '../../../Componentes/navbar-paciente/navbar-paciente.component';

@Component({
  selector: 'app-citas',
  imports: [NavbarPacienteComponent],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {

  
todos: any
error: string | null = null;
loading: boolean=false

}
