import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
//import { Prueba } from '../../../../services/servicios';
declare var $: any;
@Component({
  selector: 'app-consultar-cita',
  imports: [NavbarAdministradorComponent, CommonModule],
  templateUrl: './consultar-cita.component.html',
  styleUrl: './consultar-cita.component.css'
})
export class ConsultarCitaComponent {

todos: any
error: string | null = null;
loading: boolean=false



}
