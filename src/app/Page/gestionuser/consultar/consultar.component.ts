import { Component } from '@angular/core';
import { NavbarindexComponent } from '../../../Componentes/navbarindex/navbarindex.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  imports: [NavbarindexComponent, CommonModule, FormsModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent {
  //todos: any[] = [];  
    loading: boolean = false;
  error: string | null = null;

   todos: any[] = [
    {
      id: 1,
      usuario: 'hdavidromero',
      nombre: 'Henry',
      apellido: 'Romero',
      documento: '123456789',
      telefono: '5551234',
      nombre_rol: 'Administrador',
      estado: true
    },
    {
      id: 2,
      usuario: 'mdiaz',
      nombre: 'Moises',
      apellido: 'Diaz',
      documento: '987654321',
      telefono: '5555678',
      nombre_rol: 'Usuario',
      estado: false
    },
    {
      id: 3,
      usuario: 'jcoronadov',
      nombre: 'Jesus',
      apellido: 'Coronado',
      documento: '555666777',
      telefono: '5557890',
      nombre_rol: 'Usuario',
      estado: true
    }
  ];

}
