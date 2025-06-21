import { Component, OnInit } from '@angular/core';
import { NavbarPacienteComponent } from "../../../Componentes/navbar-paciente/navbar-paciente.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var coreui: any;

@Component({
  selector: 'app-reportes-paciente',
  imports: [NavbarPacienteComponent, FormsModule, CommonModule],
  templateUrl: './reportes-paciente.component.html',
  styleUrl: './reportes-paciente.component.css'
})
export class ReportesPacienteComponent implements OnInit {
  
 ngAfterViewInit() {
    const calendarElement = document.getElementById('calendarElement');

    if (calendarElement) {
      const calendarInstance = new coreui.Calendar(calendarElement, {
        locale: 'es-ES',
        calendars: 1,
        range: true,
      });
    }}

  
opcion: number = 1;
  fecha_de: string = '';
  fecha_hasta: string = '';
  pdfUrl: string = '';
  visualizar: boolean = false;

  todos: any[] = [];
  doctores: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  loading_select: boolean = false;
  seleccion_doctor: string[] = [];
  a: string[] = [];

  constructor() {}

  ngOnInit(): void {
  
  }

  showModal(): void {
   
  }

  Ocultar(): void {
   
  }

  generar(): void {
    
  }

  formSubmit(event: Event): void {
    event.preventDefault();
 
  }

  select_change(): void {
    
  }
}

