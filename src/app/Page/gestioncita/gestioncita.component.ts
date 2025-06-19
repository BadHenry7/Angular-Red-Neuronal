import { Component } from '@angular/core';
import {NavbarindexComponent} from '../../Componentes/navbarindex/navbarindex.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestioncita',
  imports: [NavbarindexComponent,CommonModule,FormsModule ],
  templateUrl: './gestioncita.component.html',
  styleUrl: './gestioncita.component.css'
})
export class GestioncitaComponent {
 date = new Date();

horas = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours().toString();
  v_horas= this.horas+":00"



hours: string[]=["06:30", "07:00", "07:30", "08:00","08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", 
"12:30", "13:00","13:30", "14:00", "14:30", "15:00","15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  doctorSeleccionado: string = '';
  pacienteSeleccionado: string = '';
  ubicacionSeleccionada: string = '';

  ConfirmarAgendar(){
    alert('¡Cita agendada con éxito!');
  }

}
