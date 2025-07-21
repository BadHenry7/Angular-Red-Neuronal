import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../services/citas.service';
import { Citas } from '../../../interfaces/citas';
import Swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-citas-medicas',
  imports: [NavbarDoctorComponent, CommonModule],
  templateUrl: './citas-medicas.component.html',
  styleUrl: './citas-medicas.component.css'
})

export class CitasMedicasComponent {
  todos_agenda: any = []
  todos: any
  error: string | null = null;
  loading: boolean = false;
  nombre: string = "";
  paciente: number = 0;

  constructor(private citasService: CitasService) { }

  ngOnInit() {
    this.Obtenercita(); 
  }

  ConfirmarCita(id: number){
     Swal.fire({
                title: "¿Confirmas que quieres agendar esta cita?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmar cita",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.EliminarCita(id)
                }
            });
  }
  
  EliminarCita(id: number) {
    const R_usuario={id}

    this.citasService.eliminar_cita(R_usuario).subscribe({
    next: (res) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Cita actualizada con éxito',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#00bdff',
        color: 'white',
        iconColor: 'white',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      setTimeout(() => {
        this.Obtenercita();
      }, 3000);
    },
    error: (err) => {
      Swal.fire('Error', 'No se pudo actualizar la cita', 'error');
      console.error(err);
    }
  });
  }


  Obtenercita() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.paciente = usuario.id;
    }
    const id_paciente = this.paciente;
    this.loading = true;
    const R_usuario = {
      id_paciente
    }

    this.citasService.post_citas_doctor(R_usuario).subscribe({
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

  ngAfterViewInit(): void {
    ($('#myTable') as any).DataTable();
  }
}
