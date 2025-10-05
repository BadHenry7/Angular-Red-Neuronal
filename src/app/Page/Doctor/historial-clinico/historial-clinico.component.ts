import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarDoctorComponent } from '../../../Componentes/navbar-doctor/navbar-doctor.component';
import { CitasService } from '../../../services/citas.service';
import DataTables from 'datatables.net';
import { SintomasService } from '../../../services/sintomas.service';
import { DiagnosticoService } from '../../../services/diagnosticos';
import Swal from 'sweetalert2';
import { DynamoDBService } from '../../../services/dynamodb.service';

@Component({
  selector: 'app-historial-clinico',
  imports: [CommonModule, FormsModule, NavbarDoctorComponent, ReactiveFormsModule],
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(private h_clinicoService: CitasService, private sintomasService: SintomasService,
    private diagnosticoService: DiagnosticoService, private dynamoDBService: DynamoDBService,
    private rg: FormBuilder, private citasService: CitasService) {


    this.RegisterForm = this.rg.group({
      v_sintomas: ['', [Validators.required]],
      v_desc_sintomas: ['', [Validators.required]],
      v_diagnostico: ['', [Validators.required]],
      v_desc_diagnostico: ['', [Validators.required]],
      v_observacion: ['', [Validators.required]],
      v_cita: [null, [Validators.required]],

    })

  }






  todos: any = {};
  todos2: any = [];
  citas: any = [];
  error = null;
  comprobar = false;
  loading = true;
  nombre_v = "";
  nombre: string = ''
  documento: string = ''
  telefono: string = ''
  buscardocumento_v: string = '';
  mostrarhistorial: boolean = true
  mostrarhistorialCitas: boolean = true

  citaSeleccionada: string = ''
  sintomas: string = ''
  descripcion_sintomas: string = ''
  diagnostico: string = ''
  descripcion_diagnostico: string = ''
  Observaciontratamiento: string = ''


  ngOnInit(): void {

    const usuarioguardado = localStorage.getItem("usuario")
    if (usuarioguardado) {
      const usuario = JSON.parse(usuarioguardado)
      this.id_doctor = usuario.id

      const R_usuario = {
        id_paciente: this.id_doctor
      }

      this.h_clinicoService.get_cita_doctor(R_usuario).subscribe({

        next: (data) => {
          this.citas = data
          this.citas = this.citas.resultado
          console.log(" this.citas", this.citas)
        }, error: (error) => {
          console.log("error", error)
        }

      })

    }
  }



  buscar() {
    const documento = this.buscardocumento_v;
    const R_usuario = {
      documento, id_doctor: this.id_doctor,
    }
    this.loading = true;
    this.comprobar = false;
    this.mostrarhistorial = true;
    this.nombre = '';
    this.documento = '';
    this.telefono = '';


    this.h_clinicoService.get_buscar_usuario(R_usuario).subscribe({
      next: (data) => {

        this.todos = data
        console.log(this.todos)
        this.loading = false;
        this.nombre = this.todos.nombre;
        this.documento = this.todos.documento;
        this.telefono = this.todos.telefono;

        const id_paciente = Number(this.todos.id);
        console.log(id_paciente)

        const R_usuario = {
          id_paciente
        }

        this.h_clinicoService.get_historia_clinica(R_usuario).subscribe({
          next: (data) => {
            this.todos2 = data;
            console.log(this.todos2);
            this.todos2 = this.todos2.resultado;

            setTimeout(() => {
              ($("#myTable") as any).DataTable({
                language: {
                  url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
                },
                order: []
              });;
            }, 1)


            this.comprobar = true;

          }, error: (error) => {
            if (error.status === 404) {
              this.todos2 = [];
              this.comprobar = true;
              console.log(error)



            }
          }

        })





      }, error: (error) => {
        console.log("error: ", error)
        Swal.fire({
          title: 'No se encontraron registros',
          text: 'No se pudo encontrar el historial clinico de este paciente, por favor revisar que el paciente tenga citas con usted o que el documento del paciente sea correcto',
          icon: 'error',
        });
      }

    })


  }

  v_descripcion: string = ''
  v_dia_incapacidad: string = ''
  v_observaciones: string = ''
  id_doctor: number = 0

  incapacidad() {

    const usuarioguardado = localStorage.getItem("usuario")
    if (usuarioguardado) {
      const usuario = JSON.parse(usuarioguardado)
      this.id_doctor = usuario.id

    }

    const v_paciente = this.todos.id

    const R_incapacidad = {
      descripcion: this.v_descripcion, dias_de_incapacidad: this.v_dia_incapacidad, id_usuario: v_paciente, id_doctor: this.id_doctor, observaciones: this.v_observaciones
    }

    this.dynamoDBService.añadirIncapacidad(R_incapacidad).subscribe({

      next: (data) => {
        console.log("data de añadir incapacidad", data)

        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          iconColor: "white",
          color: "white",
          background: "green",
          title: "Incapacidad medica añadida",
        });




      }, error: (error) => {
        console.log("error", error)
      }



    })


  }

  guardar() {

    const sintomas = String(this.RegisterForm.value.v_sintomas);
    const descripcion_sintomas = String(this.RegisterForm.value.v_desc_sintomas);
    const diagnostico = String(this.RegisterForm.value.v_diagnostico);
    const descripcion_diagnostico = String(this.RegisterForm.value.v_desc_diagnostico);
    const Observaciontratamiento = String(this.RegisterForm.value.v_observacion);
    const citaSeleccionada = String(this.RegisterForm.value.v_cita);

    // const R_sintomas = {
    //   nombre: this.sintomas, descripcion: this.descripcion_sintomas, estado: true, id_cita: Number(this.citaSeleccionada)
    // }

    const R_sintomas = {
      nombre: sintomas, descripcion: descripcion_sintomas, estado: true, id_cita: Number(citaSeleccionada)
    }

    console.log("R_diagnostico", R_sintomas)
    this.sintomasService.createSintoma(R_sintomas).subscribe({

      next: (data) => {

        console.log("la data de guardar sintomas", data)


        // const R_diagnostico = {
        //   id_cita: Number(this.citaSeleccionada), resultado: this.diagnostico, descripcion: this.descripcion_diagnostico, Observacion: this.Observaciontratamiento, estado: true
        // }

        const R_diagnostico = {
          id_cita: Number(citaSeleccionada), resultado: diagnostico, descripcion: descripcion_diagnostico, Observacion: Observaciontratamiento, estado: true
        }

        this.diagnosticoService.createDiagnostico(R_diagnostico).subscribe({

          next: (data) => {
            console.log("data de guardar diagnostico", data)

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              iconColor: "white",
              color: "white",
              background: "green",
              title: "Historial clinico añadido",
            });

          }, error: (error) => {
            console.log("error", error)
          }

        })


      }, error: (error) => {
        console.log("error", error)
      }

    })




  }


  async capturar() {

    await fetch('http://localhost:8000/detener_altura', {
      method: 'GET'
    });

  }


  videoSrc: string = '';

  Camara() {
    let v_id = this.todos.id;

    this.videoSrc = ''; // fuerza el reinicio
    setTimeout(() => {
      this.videoSrc = `http://localhost:8000/video_feed?id=${v_id}&cache=${Date.now()}`;
    }, 200);
  }


  ngOnDestroy() {
    console.log("destruir")
    fetch('http://localhost:8000/detener_altura', {
      method: 'GET'
    });
    this.videoSrc = '';
  }

  editar() {
    this.mostrarhistorial = false;
    this.mostrarhistorialCitas = true;

  }

  editarHistorial(id: number) {
    console.log("id a eliminar", id)
    this.mostrarhistorialCitas = false;
    this.mostrarhistorial = false;
    this.citaSeleccionada = String(id);

    const R_historial = {
      id_cita: id
    }
    this.h_clinicoService.get_historia_clinica_id(R_historial).subscribe({
      next: (data) => {
        this.todos = data
        this.todos = this.todos.resultado[0]
        console.log("this.todos", this.todos)
        console.log("this.todos", this.todos.sintomas)


        console.log('Antes del patchValue', this.RegisterForm.value);
        this.RegisterForm.patchValue({
          v_sintomas: this.todos.sintomas,
          v_desc_sintomas: this.todos.descripcion_sintomas,
          v_diagnostico: this.todos.diagnostico,
          v_desc_diagnostico: this.todos.descripcion,
          v_observacion: this.todos.Observaciontratamiento,
          v_cita: String(this.todos.id)
        })
        this.citaSeleccionada = String(this.todos.id)

        console.log('Después del patchValue', this.RegisterForm.value);
        console.log("this.RegisterForm", this.citaSeleccionada)

      }, error: (error) => {
        console.log("error", error)
      }

    })

  }

  guardarModificacion() {


    const sintomas = String(this.RegisterForm.value.v_sintomas);
    const descripcion_sintomas = String(this.RegisterForm.value.v_desc_sintomas);
    const diagnostico = String(this.RegisterForm.value.v_diagnostico);
    const descripcion_diagnostico = String(this.RegisterForm.value.v_desc_diagnostico);
    const Observaciontratamiento = String(this.RegisterForm.value.v_observacion);
    const citaSeleccionada = Number(this.RegisterForm.value.v_cita);
    const R_historial = {
      id_cita: citaSeleccionada,
      resultado: diagnostico,
      descripcion: descripcion_diagnostico,
      Observacion: Observaciontratamiento,
      nombre: sintomas,
      descripcion_sintomas: descripcion_sintomas,


    }
    console.log("R_historial", R_historial)


    this.citasService.update_historialClinico(R_historial).subscribe({

      next: (data) => {
        console.log("data de actualizar historial clinico", data)
        this.todos = data
        this.todos = this.todos.resultado?this.todos.resultado:"No hay data"
        console.log(" this.todos", this.todos)

        if (this.todos && this.todos == 'Historial_actualizada') {
          this.mostrarhistorial = true;
          this.mostrarhistorialCitas = true;
          Swal.fire({
            title: 'Historial clinico actualizado',
            text: 'El historial clinico ha sido actualizado correctamente',
            icon: 'success',
          });

          this.buscar();

        }
      }, error: (error) => {
        console.log("error", error)
        if (error.status === 404) {
          Swal.fire({
            title: 'Error al actualizar',
            text: 'No se pudo actualizar el historial clinico, por favor intente de nuevo',
            icon: 'error',
          });}
          else if (error.status === 500) {
            Swal.fire({
              title: 'Error del servidor',
              text: 'Hubo un error en el servidor, por favor intente de nuevo más tarde',
              icon: 'error',
            });
          }  
      }
    })
  }

}
