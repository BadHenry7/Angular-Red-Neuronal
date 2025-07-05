import { Component } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-buscar-medicos',
  imports: [NavbarAdministradorComponent,CommonModule,FormsModule],
  templateUrl: './buscar-medicos.component.html',
  styleUrl: './buscar-medicos.component.css'
})
export class BuscarMedicosComponent {
   loading: boolean = false;
  error: string | null = null;
  todos: any;
}
