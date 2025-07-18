import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../../services/citas.service';
import { Citas } from '../../../../interfaces/citas';

//import { Prueba } from '../../../../services/servicios';
declare var $: any;
@Component({
  selector: 'app-consultar-cita',
  imports: [NavbarAdministradorComponent, CommonModule],
  templateUrl: './consultar-cita.component.html',
  styleUrl: './consultar-cita.component.css'
})

export class ConsultarCitaComponent{

  todos: any;
  todos_cita: any;
  loading = false;
  error: string | null = null;

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.obtenerCitas(); 
  }

  obtenerCitas(): void {
    this.loading = true;
    this.citasService.get_cita_admin().subscribe({
      next: (res) => {
        this.todos = res;
        this.todos=this.todos.resultado;
        this.loading = false;

        //datatable:
          setTimeout(() => {
      ($('#myTable') as any).DataTable({
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",},
            order: []
        }); 

      // Destruye DataTable si ya existe
    }, 1  );




      },
      error: (err) => {
        this.error = 'No se pudo cargar la lista de citas';
        this.loading = false; 
        console.error(err);
      }
    });
  }

}
