import { Component, OnInit } from '@angular/core';
import { NavbarPacienteComponent } from '../../../Componentes/navbar-paciente/navbar-paciente.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../../services/citas.service';
import { UsersService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-citas',
  imports: [NavbarPacienteComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

  todos: any = [];
  doctor: any = [];
  ubicacion: any = [];
  error: string | null = null;
  id_telegram: string = ''
  id: number = 0
  NombreDoctor = ""


  constructor(private ac: FormBuilder, private citasService: CitasService, private userService: UsersService) {
    this.asigncita = this.ac.group({
      v_fecha: ['', [Validators.required]],
      v_doctor: ['', [Validators.required]],

      v_ubicacion: ['', [Validators.required]]
    })
  }


  cambiarNombreDoctor() {
    this.NombreDoctor = '';
    for (let i = 0; i < this.doctor.length; i++) {
      if (this.doctor[i].id == this.doctorSeleccionado) {
        this.NombreDoctor = this.doctor[i].nombre;
        break;
      }
    }
  }

  ngOnInit(): void {

    this.obtenerdoctor();
    this.obtenerUbicacion();


  }///post_citas_users/

  obtenerdoctor() {

    this.userService.getMedico().subscribe({
      next: (res) => {
        this.doctor = res;
        this.doctor = this.doctor.resultado;
      },
      error: (err) => {
        this.error = 'no se pudo cargar los medicos';
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
      },
      error: (err) => {
        this.error = 'no se pudo cargar las ubicaciones';
        console.error(err);
      }
    })

  }




  date = new Date();

  horas = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours().toString();
  
  v_horas = this.horas + ":00"

  year: number = this.date.getFullYear();

  month: string = (this.date.getMonth() + 1) < 10 
    ? '0' + (this.date.getMonth() + 1) 
    : (this.date.getMonth() + 1).toString();

  day: string = this.date.getDate() < 10 
    ? '0' + this.date.getDate() 
    : this.date.getDate().toString();

  fecha: string = `${this.year}-${this.month}-${this.day}`;  


  hours: string[] = ["06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",]

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  doctorSeleccionado: string = '';
  pacienteSeleccionado: string = '';
  ubicacionSeleccionada: string = '';

  asigncita: FormGroup;



  ConfirmarAgendar() {
    Swal.fire({
      title: "¿Confirmas que quieres agendar esta cita?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, añadir cita",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cita agendada!",
          icon: "success",
          draggable: true
        });
        this.Agendar();
      }
    });

  }


  Agendar() {

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.id = usuario.id;
    }

    const fecha = String(this.asigncita.value.v_fecha);
    const id_usuario = Number(this.asigncita.value.v_doctor);
    const id_paciente = Number(this.id)
    const ubicacion = String(this.asigncita.value.v_ubicacion);
    const hora = String(this.horaSeleccionada);
    const estado = Boolean(1)

    const R_cita = { fecha, id_usuario, id_paciente, ubicacion, hora, estado };
    //console.log("Datos a registrar:"+"\n"+fecha+"\n"+doctor+"\n"+paciente+"\n"+ubicacion)

    this.citasService.create_cita_admin(R_cita).subscribe({
      next: (todos) => {
        this.todos = todos;

      }, error: (error) => {
        console.log(error)
      }
      ,
    })
  }



  guardar() {

    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.id = usuario.id;
    }

    const id = this.id;

    const id_telegram = this.id_telegram

    const N_telegram = {
      id, id_telegram
    }

    this.citasService.notificaciones_telegram(N_telegram).subscribe({
      next: (todos) => {
        this.todos = todos;

        alert("Notificaciones activadas")

      }, error: (error) => {
        console.log(error)
      }
      ,
    })
  }


// vhora='';
//   mostrar_horas(hora_onclick: string) {
//     this.vhora = hora_onclick;
//     this.mostrar_fecha()
//   }


  mostrar_fecha() {



    console.log("entro a mostrar fecha")
    const vfecha = this.fechaSeleccionada;
    console.log("v_fecha", vfecha)
    console.log(this.fecha)
    if (vfecha > String( this.fecha)) {
      this.v_horas = "05:00"
      console.log(this.v_horas)
    } else {
      this.v_horas = this.horas + ":00"
      console.log("acaaa",this.v_horas)

    }



  }
}