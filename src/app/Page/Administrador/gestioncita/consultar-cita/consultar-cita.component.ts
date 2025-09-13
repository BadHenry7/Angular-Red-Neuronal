import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../../services/citas.service';
import { Citas } from '../../../../interfaces/citas';
import { UsersService } from '../../../../services/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'


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
  salas: any = [];
  Id: any = [];
  error: string | null = null;
  mostrarTabla: boolean = true

  ActualizarCitasForm: FormGroup;

  constructor(private citasService: CitasService, private userService: UsersService, private act_cita: FormBuilder) {

    this.ActualizarCitasForm = this.act_cita.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo

      v_doctor: ['', [Validators.required]],
      v_fecha: ['', [Validators.required]],
      v_hora: ['', [Validators.required]],
      v_ubicacion: ['', [Validators.required]],
      v_salas: ['', [Validators.required]],
    })

  }

  Confirmar_eliminar(id: number, fecha: string, hora: string, paciente: string, email:string) {
    Swal.fire({
      title: "De verdad quieres eliminar esta cita?",
      text: "Esto no se puede deshacer",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar cita",
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivar(id, fecha, hora, paciente, email)
      }
    });


  }

  desactivar(id: number, fecha: string,hora: string, paciente: string, email: string) {

    let cita_id = id

    const R_cita = { id: cita_id }

    this.citasService.desactivar_cita(R_cita).subscribe({
      next: (res) => {
        console.log('Cita actualizada', res);
        this.mostrarTabla = true;
        Swal.fire({
          title: 'Cita actualizada',
          text: 'Cita actualizado con exito',
          icon: 'success',
          confirmButtonText: 'Ok',

        }).then((result) => {
          if (result.isConfirmed) {
            this.obtenerCitas();
            console.log('Confirmado');
            this.enviar_correo(fecha, hora, paciente, email)  
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar cita', err);
      }
    });

  }

  actualizar() {

    const R_cita = {
      id: this.Id,
      id_usuario: this.ActualizarCitasForm.value.v_doctor,
      fecha: this.ActualizarCitasForm.value.v_fecha,
      hora: this.ActualizarCitasForm.value.v_hora,
      ubicacion: this.ActualizarCitasForm.value.v_ubicacion,
      salas: this.ActualizarCitasForm.value.v_salas
    }



    this.citasService.update_Cita(R_cita).subscribe({
      next: (res) => {
        console.log('Cita actualizada', res);
        this.mostrarTabla = true;
        Swal.fire({
          title: 'Cita actualizada',
          text: 'Cita actualizado con exito',
          icon: 'success',
          confirmButtonText: 'Ok',

        }).then((result) => {
          if (result.isConfirmed) {
            this.obtenerCitas();
            console.log('Confirmado');
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar cita', err);
      }
    });

  }

  ngOnInit(): void {
    this.obtenerCitas();

  }


  editarCitas(id: number) {//    editar_cita/"  -->POST
    console.log("entra")
    this.mostrarTabla = false;
    this.obtenerdoctor(id);
    this.obtenerUbicacion();
  }

  editarPaciente(vid: number) {
    this.Id = vid


    const id = Number(vid)

    const R_cita = { id };

    this.citasService.editar_cita(R_cita).subscribe({
      next: (res) => {//editar_cita/"
        this.todos = res;
        this.todos = this.todos.resultado;
        console.log("El usuario que se va a editar es este", this.todos)

        this.ActualizarCitasForm.patchValue({
          v_doctor: this.todos[0].id_usuario,
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
        console.log("ubicacion", this.ubicacion)

        const nombre_hospital = this.ActualizarCitasForm.value.v_ubicacion
        console.log("la variable id hospitale es", nombre_hospital);//en vez de ID, Texto

        this.mostrar_salas();


      },
      error: (err) => {
        this.error = 'no se pudo cargar los pacientes';
        console.error(err);
      }
    })

  }


  mostrar_salas() {
    const nombre_hospital = this.ActualizarCitasForm.value.v_ubicacion;

    this.citasService.getsala(nombre_hospital).subscribe({
      next: (res) => {
        this.salas = res;
        this.salas = this.salas.data
        console.log("salaas", this.salas)
      },
      error: (err) => {
        this.error = 'No se pudo cargar las salas';
        console.error(err);
      }
    })
  }


  obtenerCitas(): void {

    console.log("entra aca22")
    $('#myTable').DataTable().clear().destroy();



    this.citasService.get_cita_admin().subscribe({
      next: (res) => {
        this.todos = res;
        this.todos = this.todos.resultado;
        console.log(this.todos)



        //datatable:
        setTimeout(() => {
          this.mostrarTabla = true;
          this.loading = false;


          ($('#myTable') as any).DataTable({
            language: {
              url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
            },
            order: []
          });


        }, 1);




      },
      error: (err) => {
        this.error = 'No se pudo cargar la lista de citas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  serviceID = 'service_cjysjeb'
  templateID = 'template_omysd2v'
  apikey = 'e4rSWNCpNM-Ie0gbQ'


  enviar_correo(fecha: string,hora: string, paciente: string, email: string) {

    const v_nombre = paciente
    const v_fecha = fecha
    const v_hora = hora
    const v_email = email

    emailjs.init(this.apikey);
    emailjs.send(this.serviceID, this.templateID, {
      name: v_nombre,
      email: v_email,
      fecha: v_fecha,
      hora: v_hora,
    })
      .then(result => {
        alert('Correo enviado con éxito!');
      })
      .catch(error => {
        console.log('Error al enviar el correo:', error.text);
      });

   
  }


}
