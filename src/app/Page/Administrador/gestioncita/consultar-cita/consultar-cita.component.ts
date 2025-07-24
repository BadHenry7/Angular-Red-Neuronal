import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../../services/citas.service';
import { Citas } from '../../../../interfaces/citas';
import { UsersService } from '../../../../services/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


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
  doctor: any = [];
  ubicacion: any = [];
  Id: any = [];
  error: string | null = null;
  mostrarTabla: boolean=true

  ActualizarCitasForm: FormGroup;

  constructor(private citasService: CitasService, private userService: UsersService ,private act_cita: FormBuilder) {

    this.ActualizarCitasForm = this.act_cita.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_paciente: ['', [Validators.required]],
      v_doctor: ['', [Validators.required]],
      v_fecha: ['', [Validators.required]],
      v_hora: ['', [Validators.required]],
      v_ubicacion: ['', [Validators.required]],
      v_salas: ['', [Validators.required]],
    })

  }

  actualizar(){

  }

  ngOnInit(): void {
    this.obtenerCitas();

  }


  editarCitas(id: number){//    editar_cita/"  -->POST
    console.log("entra")
    this.mostrarTabla=false;
    this.obtenerdoctor(id);
    this.obtenerUbicacion();
  }

  editarPaciente(vid: number){
    this.Id=vid

  
    const id = Number(vid)

    const R_cita = { id};

    this.citasService.editar_cita(R_cita).subscribe({
      next: (res) => {//editar_cita/"
        this.todos = res;
        this.todos = this.todos.resultado;
        console.log("El usuario que se va a editar es este",this.todos)    
        
        this.ActualizarCitasForm.patchValue({
          v_doctor: this.todos[0].id_usuario ,
          v_fecha: this.todos[0].fecha, 
          v_hora: this.todos[0].hora,
          v_ubicacion: this.todos[0].ubicacion,
          v_salas: this.todos[0].salas
          //   v_id_especialidad: this.todos_especialidades
        });
        


      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })
  }


    obtenerdoctor(id: number) {

    this.userService.getMedico().subscribe({
      next: (res) => {
        this.doctor = res;
        this.doctor = this.doctor.resultado;
        console.log("doctorrrrrrr", this.doctor)
    this.editarPaciente(id)

      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })

  }

  obtenerUbicacion() {

        


    this.citasService.getubicacion().subscribe({
      next: (res) => {
        this.ubicacion = res;
        console.log(this.ubicacion)
        this.ubicacion = this.ubicacion.data;
        console.log("ubicacion",this.ubicacion)
        
        const v_id_hospital=this.ubicacion[0].nombre_hospital
      
          this.citasService.getsala(v_id_hospital)


      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })

  }



  
  obtenerCitas(): void {
    $('#myTable').DataTable().clear().destroy();//Como no podemos recargar, toca destruir la tabla
    this.mostrarTabla=true

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
