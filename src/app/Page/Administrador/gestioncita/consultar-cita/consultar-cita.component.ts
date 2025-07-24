import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../../services/citas.service';
import { Citas } from '../../../../interfaces/citas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//import { Prueba } from '../../../../services/servicios';
declare var $: any;
@Component({
  selector: 'app-consultar-cita',
  imports: [NavbarAdministradorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './consultar-cita.component.html',
  styleUrl: './consultar-cita.component.css'
})

export class ConsultarCitaComponent {

  todos: any;
  todos_cita: any;
  loading = false;
  error: string | null = null;
  mostrarTabla: boolean=true

  ActualizarCitasForm: FormGroup;

  constructor(private citasService: CitasService, private act_cita: FormBuilder) {

    this.ActualizarCitasForm = this.act_cita.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_paciente: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_doctor: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_fecha: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      v_hora: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_ubicacion: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      v_salas: ['', [Validators.required]],
    })

  }

  actualizar(){

  }

  ngOnInit(): void {
    this.obtenerCitas();
  }


  editarCitas(){
    this.mostrarTabla=true;
  }


  obtenerCitas(): void {
    this.loading = true;
    this.citasService.get_cita_admin().subscribe({
      next: (res) => {
        this.todos = res;
        this.todos = this.todos.resultado;
        this.loading = false;

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
