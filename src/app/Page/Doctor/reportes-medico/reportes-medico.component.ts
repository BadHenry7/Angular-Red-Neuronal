import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-medico',
  imports: [NavbarDoctorComponent, FormsModule, CommonModule],
  templateUrl: './reportes-medico.component.html',
  styleUrl: './reportes-medico.component.css'
})

export class ReportesMedicoComponent implements OnInit  {
  
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
