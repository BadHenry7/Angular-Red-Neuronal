import { Component, OnInit } from '@angular/core';
import { NavbarPacienteComponent } from '../../../Componentes/navbar-paciente/navbar-paciente.component';
import { CitasService } from '../../../services/citas.service';
import { ReportesUsuario } from '../../../interfaces/citas';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-ver-citas',
  imports: [NavbarPacienteComponent, CommonModule],
  templateUrl: './ver-citas.component.html',
  styleUrl: './ver-citas.component.css'
})
export class VerCitasComponent {

  todos: any = [];
  error: string | null = null;
  id: number = 0
  paciente: number = 0;
  loading: boolean = false;




constructor (private citasService: CitasService) {};

ngOnInit(): void {

this.obtenercita();

}

obtenercita(){
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.paciente = usuario.id;
    }
    const id_paciente = this.paciente;
    this.loading = true;
    const R_usuario = {
      id_paciente
    }

  this.citasService.post_citas_users(R_usuario).subscribe({
      next: (res) => {
        this.todos = res;
        this.todos = this.todos.resultado;
        this.loading = false;
        console.log(this.todos)

        //datatable:
        setTimeout(() => {
          ($('#myTable') as any).DataTable({
            language: {
              url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
            },
            order: []
          });

          // Destruye DataTable si ya existe
        }, 1);




      },
      error: (err) => {
        this.error = 'No se pudo cargar la lista de citas';
        this.loading = false;
        console.error(err);
      }
    });
}

 

}
