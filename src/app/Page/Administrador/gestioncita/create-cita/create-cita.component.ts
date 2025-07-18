import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import Swal from 'sweetalert2'
import { CitasService } from '../../../../services/citas.service';
import { UsersService } from '../../../../services/usuarios.service';

@Component({
  selector: 'app-create-cita',
  imports: [CommonModule, FormsModule, NavbarAdministradorComponent, ReactiveFormsModule],
  templateUrl: './create-cita.component.html',
  styleUrl: './create-cita.component.css'
})

 
export class CreateCitaComponent implements OnInit{

    todos: any=[];
    doctor: any=[];
    ubicacion: any=[];
    error: string | null=null;

   
  constructor (private ac: FormBuilder, private citasService: CitasService, private userService: UsersService){
    this.asigncita = this.ac.group ({
      v_fecha: ['', [Validators.required]],
      v_doctor: ['',[Validators.required]],
      v_paciente:['',[Validators.required]],
      v_ubicacion:['',[Validators.required]]
    })
  }


  ngOnInit(): void {
  
    this.Obtenerpaciente();
    this.obtenerdoctor();
    this.obtenerUbicacion();


  }

  Obtenerpaciente(){

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

  obtenerdoctor(){

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

  obtenerUbicacion(){

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

  NombreDoctor: string=""
  NombrePaciente:string=""

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
  v_horas= this.horas+":00"

  hours: string[]=["06:30", "07:00", "07:30", "08:00","08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", 
  "12:30", "13:00","13:30", "14:00", "14:30", "15:00","15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",]

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  doctorSeleccionado: string = '';
  pacienteSeleccionado: string = '';
  ubicacionSeleccionada: string = '';

  asigncita:FormGroup;


  ConfirmarAgendar(){
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


  Agendar(){
    
    const fecha=String(this.asigncita.value.v_fecha);
    const id_usuario=Number(this.asigncita.value.v_doctor);
    const id_paciente=Number(this.asigncita.value.v_paciente);
    const ubicacion=String(this.asigncita.value.v_ubicacion);
    const hora= String(this.horaSeleccionada);
    const estado=Boolean(1);
    const R_cita={fecha, id_usuario, id_paciente, ubicacion, hora, estado};
    //console.log("Datos a registrar:"+"\n"+fecha+"\n"+doctor+"\n"+paciente+"\n"+ubicacion)

    this.citasService.create_cita_admin(R_cita).subscribe({
      next: (todos)=>{
        this.todos = todos;

      },error: (error)=>{
        console.log(error)
      }
      ,
    })

    console.log()



  }

}
