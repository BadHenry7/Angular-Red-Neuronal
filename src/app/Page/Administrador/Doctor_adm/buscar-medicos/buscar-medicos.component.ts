import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/usuarios.service';
import { AtribxUsuarioService } from '../../../../services/atribxusuario.service';
import { User } from '../../../../interfaces/usuarios';
import { Especialidad, Especialidades } from '../../../../interfaces/atribxusaurio';

import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


declare var $: any;
declare var Swal: any;
declare var toast: any;

@Component({
  selector: 'app-buscar-medicos',
  imports: [NavbarAdministradorComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './buscar-medicos.component.html',
  styleUrl: './buscar-medicos.component.css'
})

export class BuscarMedicosComponent implements OnInit {

  error: String | null = null;
  loading: Boolean = false

  data: any;

  todos_especialidades: any;
  todoseespecialidades: any;
  todos: any
  
  todos_resp: any
  todoseespecialidades_editar: any
  todos_editar: any;
  valido: boolean = false
  ActualizarDocForm: FormGroup;
  usuarioEditando = false


  constructor(private doctorcalled: UsersService, private atribxUsuario: AtribxUsuarioService, private actdoc: FormBuilder) {
    this.ActualizarDocForm = this.actdoc.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      v_nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      v_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_id_especialidad: ['', [Validators.required]],
      v_estado: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.loadDoctors();
  }


  loadDoctors(): void {
    this.doctorcalled.getMedico().subscribe(todos => {
      this.todos = todos;
      this.todos = this.todos.resultado;

      console.log(this.todos)
      setTimeout(() => {
        ($('#myTable') as any).DataTable({
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
          },
          order: []
        });;
      }, 1);
    });

    this.atribxUsuario.getAtributosXusuarios().subscribe(todoseespecialidades => {
      this.todoseespecialidades = todoseespecialidades;
      this.todoseespecialidades = this.todoseespecialidades.resultado;
      console.log(this.todoseespecialidades)
      error: (err: any) => {
        console.error('Error cargando especialidades:', err);
      }
    })
  }

  loadEspecialidades(): void {
    this.atribxUsuario.getEspecialidades().subscribe({
      next: (data) => {
        this.todos_resp = data;
        this.todos_especialidades = this.todos_resp.data
        console.log(this.todos_especialidades)

        console.log("esta es la de especialidades", this.todos_especialidades)
      },
      error: (err) => {
        console.error('Error cargando especialidades:', err);
      }
    });
  }

  v_id: number = 0
  mostrarTabla = true;
  editar(id: number) {
    this.v_id = id;
    const id_usuario=id
    this.mostrarTabla = false;

    const N_Doctor = { id }
    const A_Doctor = { id_usuario } //fuistes un visionario
    this.loadEspecialidades();

    this.doctorcalled.getUser(N_Doctor).subscribe({
      next: (todos) => {
        this.todos_editar = todos;
        console.log(this.todos_editar)

        this.ActualizarDocForm.patchValue({
          v_nombre: this.todos_editar.nombre,
          v_apellido: this.todos_editar.apellido,
          v_documento: this.todos_editar.documento,
          v_telefono: this.todos_editar.telefono,
          v_usuario: this.todos_editar.usuario,
          v_estado: this.todos_editar.estado
          //   v_id_especialidad: this.todos_especialidades
        });

        this.atribxUsuario.getAtributosXusuario(A_Doctor).subscribe({
          next: (todoseespecialidades) => {
            this.todoseespecialidades_editar = todoseespecialidades;
            console.log("CUAL ESSSSSSSSSSSSSSSSSSSSSSSSS", this.todoseespecialidades_editar.valor)

            this.ActualizarDocForm.patchValue({
              v_id_especialidad: this.todoseespecialidades_editar.valor
            });
          }, error: (error) => {
            console.log(error)
          }

        });
      }
    });

  }

  actualizar() {
    console.log("Se va actualizar la id", this.v_id)
    const id = this.v_id
    const nombre = String(this.ActualizarDocForm.value.v_nombre);
    const apellido = String(this.ActualizarDocForm.value.v_apellido);
    const documento = String(this.ActualizarDocForm.value.v_documento);
    const telefono = String(this.ActualizarDocForm.value.v_telefono);
    const id_especialidad = Number(this.ActualizarDocForm.value.v_id_especialidad);
    const usuario = String(this.ActualizarDocForm.value.v_usuario);
    const estado = this.ActualizarDocForm.value.v_estado;
    const id_rol= Number(3)
    console.log(estado)

    const N_Doctor = {
      nombre, apellido, documento, telefono, usuario, id, id_especialidad, estado, id_rol
    }

    this.doctorcalled.UpdateUser(N_Doctor).subscribe({
      next: (todos) => {
        this.todos_editar = todos;
        console.log(this.todos_editar)

        Swal.fire({
          title: "Doctor actualizado",
          icon: "success",

        })

        this.mostrarTabla = true;
        $('#myTable').DataTable().clear().destroy();//Como no podemos recargar, toca destruir la tabla
        this.loadDoctors();

      }, error: (error) => {
        console.log(error)
      }
    });
  }

  activar_desactivar(id: number, estado: boolean) {
    this.v_id = id;
    const R_usuario = { id, estado }
    console.log("El estado que toma es", estado);
    this.doctorcalled.EstadoUser(R_usuario).subscribe({
      next: (todos) => {
        this.todos_editar = todos;
        console.log(this.todos_editar)

        if (estado == true) {

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: any) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            iconColor: "#000000",
            color: "black",
            background: "#76fa78",
            title: "Doctor activado con exito",
          });

          $('#myTable').DataTable().clear().destroy();//
          this.loadDoctors();

        } else {

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: any) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            iconColor: "white",
            color: "white",
            background: "#ff4e4e",
            title: "Doctor desactivado con exito",
          });

          $('#myTable').DataTable().clear().destroy();//Como no podemos recargar, toca destruir la tabla
          this.loadDoctors();
        }
      }, error: (error) => {
        console.log(error)
      }
    });
  }

}
