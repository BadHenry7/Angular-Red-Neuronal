import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarDoctorComponent } from '../../../Componentes/navbar-doctor/navbar-doctor.component';
import { CitasService } from '../../../services/citas.service';
import DataTables from 'datatables.net';
import { SintomasService } from '../../../services/sintomas.service';
import { DiagnosticoService } from '../../../services/diagnosticos';
import Swal from 'sweetalert2';
import { DynamoDBService } from '../../../services/dynamodb.service';

@Component({
  selector: 'app-historial-clinico',
  imports: [CommonModule, FormsModule, NavbarDoctorComponent],
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent implements OnInit {
  constructor(private h_clinicoService: CitasService, private sintomasService: SintomasService, private diagnosticoService: DiagnosticoService, private dynamoDBService: DynamoDBService) { }


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
      documento
    }
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
            console.log(error)
          }

        })





      }, error: (error) => {
        console.log("error: ", error)
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

    const R_sintomas = {
      nombre: this.sintomas, descripcion: this.descripcion_sintomas, estado: true, id_cita: Number(this.citaSeleccionada)
    }
    console.log("R_diagnostico", R_sintomas)
    this.sintomasService.createSintoma(R_sintomas).subscribe({

      next: (data) => {

        console.log("la data de guardar sintomas", data)


        const R_diagnostico = {
          id_cita: Number(this.citaSeleccionada), resultado: this.diagnostico, descripcion: this.descripcion_diagnostico, Observacion: this.Observaciontratamiento, estado: true
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

    await fetch('https://red-neuronal-api.onrender.com/detener_altura', {
      method: 'GET'
    });

  }


  videoSrc: string = '';

  Camara() {
    let v_id = this.todos.id;

    this.videoSrc = ''; // fuerza el reinicio
    setTimeout(() => {
      this.videoSrc = `https://red-neuronal-api.onrender.com/video_feed?id=${v_id}&cache=${Date.now()}`;
    }, 200);
  }


  ngOnDestroy() {
    console.log("destruir")
    fetch('https://red-neuronal-api.onrender.com/detener_altura', {
      method: 'GET'
    });
    this.videoSrc = '';
  }

  editar() {
    this.mostrarhistorial = false;

  }



}
