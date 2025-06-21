import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';

@Component({
  selector: 'app-create-cita',
  imports: [CommonModule, FormsModule, NavbarAdministradorComponent, ReactiveFormsModule],
  templateUrl: './create-cita.component.html',
  styleUrl: './create-cita.component.css'
})
export class CreateCitaComponent {


  date = new Date();

  horas = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours().toString();
  v_horas= this.horas+":00"

  hours: string[]=["06:30", "07:00", "07:30", "08:00","08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", 
  "12:30", "13:00","13:30", "14:00", "14:30", "15:00","15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",]

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  doctorSeleccionado: string = '';
  pacienteSeleccionado: string = '';
  ubicacionSeleccionada: string = '';

  asigncita:FormGroup;

  constructor (private ac: FormBuilder){
    this.asigncita = this.ac.group ({
      v_fecha: ['', [Validators.required]],
      v_doctor: ['',[Validators.required]],
      v_paciente:['',[Validators.required]],
      v_ubicacion:['',[Validators.required]]
    })
  }


  ConfirmarAgendar(){
    alert('¡Cita agendada con éxito!');
    const fecha=String(this.asigncita.value.v_fecha);
    const doctor=String(this.asigncita.value.v_doctor);
    const paciente=String(this.asigncita.value.v_paciente);
    const ubicacion=String(this.asigncita.value.v_ubicacion);

console.log("Datos a registrar:"+"\n"+fecha+"\n"+doctor+"\n"+paciente+"\n"+ubicacion)
    
  }

}
