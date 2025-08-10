import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarDoctorComponent } from '../../../Componentes/navbar-doctor/navbar-doctor.component';
import { CitasService } from '../../../services/citas.service';
import DataTables from 'datatables.net';

@Component({
  selector: 'app-historial-clinico',
  imports: [CommonModule, FormsModule, NavbarDoctorComponent],
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent implements OnInit {
  constructor(private h_clinicoService: CitasService) { }

  ngOnInit(): void {

  }
  todos: any = {};
  todos2: any = [];
  citas: any[] = [];
  error = null;
  comprobar = false;
  loading = true;
  nombre_v = "";
  nombre: string = ''
  documento: string = ''
  telefono: string = ''
  buscardocumento_v: string = '';
  mostrarhistorial: boolean = true

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



  incapacidad() {

  }

  guardar() {



  }


  async capturar(){

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

  editar() {
    this.mostrarhistorial = false;

  }



}
