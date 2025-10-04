import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import Swal from 'sweetalert2'
import { CitasService } from '../../../../services/citas.service';
import { UsersService } from '../../../../services/usuarios.service';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-create-cita',
  imports: [CommonModule, FormsModule, NavbarAdministradorComponent, ReactiveFormsModule],
  templateUrl: './create-cita.component.html',
  styleUrl: './create-cita.component.css'
})


export class CreateCitaComponent implements OnInit {

  todos: any = [];
  todosHoras: any = []
  doctor: any = [];
  ubicacion: any = [];
  error: string | null = null;

  validando: string[] = [];

  constructor(private ac: FormBuilder, private citasService: CitasService, private userService: UsersService) {
    this.asigncita = this.ac.group({
      v_fecha: ['', [Validators.required]],
      v_doctor: ['', [Validators.required]],
      v_paciente: ['', [Validators.required]],
      v_ubicacion: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {

    this.Obtenerpaciente();
    this.obtenerdoctor();
    this.obtenerUbicacion();
    this.validarHora();


  }

  validarHora() {


    this.citasService.validarHora().subscribe({

      next: (dataHora) => {

        this.todosHoras = dataHora
        this.todosHoras = this.todosHoras.resultado
        console.log("dataHora", this.todosHoras)
        //console.log("hora", this.hours)

      
        for (let i = 0; i < this.hours.length; i++) {
        

          for (let j = 0; j < this.todosHoras.length; j++) {

            // console.log("fecha", this.fecha)
            // console.log("fecha22", this.todosHoras[j].Fecha)
            if (this.hours[i] == String(this.todosHoras[j].Hora) && String(this.fecha) == String(this.todosHoras[j].Fecha)) {
             // console.log(this.todosHoras[j].Hora, "si es igual aca", this.hours[i])
              this.validando.push(this.hours[i]);
            }

          }
        }

      }, error: (error) => {
        console.log("error", error)
      }

    })


  }


  validarFecha(vfecha: string) {

    this.validando.length = 0;

    for (let i = 0; i < this.hours.length; i++) {
      //console.log("dataHora", this.todosHoras[i].Hora)

      for (let j = 0; j < this.todosHoras.length; j++) {

        // console.log("fecha", this.fecha)
        // console.log("fecha22", this.todosHoras[j].Fecha)
        if (this.hours[i] == String(this.todosHoras[j].Hora) && String(vfecha) == String(this.todosHoras[j].Fecha)) {
          // console.log(this.todosHoras[j].Hora, "si es igual aca", this.hours[i])
          this.validando.push(this.hours[i]);
        }

      }
    }
  }


  Obtenerpaciente() {

    this.userService.getpaciente().subscribe({
      next: (res) => {
        this.todos = res;
        this.todos = this.todos.resultado;
      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })

  }

  obtenerdoctor() {

    this.userService.getMedico().subscribe({
      next: (res) => {
        this.doctor = res;
        this.doctor = this.doctor.resultado;
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
      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })

  }

  NombreDoctor: string = ""
  NombrePaciente: string = ""

  cambiarNombreDoctor() {
    this.NombreDoctor = '';
    for (let i = 0; i < this.doctor.length; i++) {
      if (this.doctor[i].id == this.doctorSeleccionado) {
        this.NombreDoctor = this.doctor[i].nombre;
        break;
      }
    }
  }


  cambiarNombrePaciente() {
    this.NombrePaciente = '';
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == this.pacienteSeleccionado) {
        this.NombrePaciente = this.todos[i].nombre;
        break;
      }
    }
  }

  date = new Date();

  horas = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours().toString();
  v_horas = this.horas + ":00:00"

  year: number = this.date.getFullYear();

  month: string = (this.date.getMonth() + 1) < 10
    ? '0' + (this.date.getMonth() + 1)
    : (this.date.getMonth() + 1).toString();

  day: string = this.date.getDate() < 10
    ? '0' + this.date.getDate()
    : this.date.getDate().toString();

  fecha: string = `${this.year}-${this.month}-${this.day}`;


  hours: string[] = ["06:30:00", "07:00:00", "07:30:00", "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00",
    "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00",]

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

    const fecha = String(this.asigncita.value.v_fecha);
    const id_usuario = Number(this.asigncita.value.v_doctor);
    const id_paciente = Number(this.asigncita.value.v_paciente);
    const ubicacion = String(this.asigncita.value.v_ubicacion);
    const hora = String(this.horaSeleccionada);
    const estado = Boolean(1);
    const R_cita = { fecha, id_usuario, id_paciente, ubicacion, hora, estado };
    //console.log("Datos a registrar:"+"\n"+fecha+"\n"+doctor+"\n"+paciente+"\n"+ubicacion)

    this.citasService.create_cita_admin(R_cita).subscribe({
      next: (todos) => {
        console.log(todos);


      }, error: (error) => {
        console.log(error)
      }
      ,
    })

    



  }

  serviceID = 'service_yev294m'
  templateID = 'template_i73qkfa'
  apikey = 'gVmq9ZyZNWP2_LzXW'
  nb: string = ''
  ce: string = ''


  mostrar_fecha() {



    console.log("entro a mostrar fecha")
    const vfecha = this.fechaSeleccionada;
    this.validarFecha(vfecha)
    console.log("v_fecha", vfecha)
    console.log(this.fecha)
    if (vfecha > String(this.fecha)) {
      this.v_horas = "05:00:00"
      console.log(this.v_horas)
    } else {
      this.v_horas = this.horas + ":00:00"
      console.log("acaaa", this.v_horas)

    }



  }

}
