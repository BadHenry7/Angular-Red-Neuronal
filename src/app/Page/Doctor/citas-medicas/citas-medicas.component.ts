import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-citas-medicas',
  imports: [NavbarDoctorComponent, CommonModule],
  templateUrl: './citas-medicas.component.html',
  styleUrl: './citas-medicas.component.css'
})

export class CitasMedicasComponent {
  todos_agenda:any=[]  
  todos: any
  error: string | null = null;
  loading: boolean=false;
  nombre: string="";
  
  

  ngAfterViewInit(): void {
    ($('#myTable') as any).DataTable();
  }
}
