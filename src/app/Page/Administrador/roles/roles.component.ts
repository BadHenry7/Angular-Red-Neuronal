import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../services/rol.service';
import { ModuloService } from '../../../services/modulo.service';
import DataTables from 'datatables.net';
import { ModuloxPerfilService } from '../../../services/moduloxperfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  imports: [NavbarAdministradorComponent, FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  constructor(private rolesService: RolesService, private moduloService: ModuloService, private moduloxPerfilService: ModuloxPerfilService) { }


  loading: boolean = true;
  error: null = null;
  todos: any = {}
  t_roles: any = []
  todos_modulos: any = []
  seleccionados: number[] = [];

  todos_info: any = {}
  todos_mxp: any = {}
  rol_v = 0
  name_m: string = ""
  descripcion: string = ""


  ngOnInit(): void {
    this.loading = false;

    this.loadRoles()
    this.loadModulo()
  }

  loadModulo(): void {
    this.moduloService.getModulos().subscribe({

      next: (data) => {
        this.todos_modulos = data
        this.todos_modulos = this.todos_modulos.resultado
        console.log(this.todos_modulos)


      }, error: (error) => {
        console.log(error)
      }


    })

  }


  loadRoles(): void {

    this.rolesService.get_roles().subscribe({
      next: (data) => {

        this.t_roles = data;
        this.t_roles = this.t_roles.resultado;
        console.log(this.t_roles)
        setTimeout(() => {
          ($('#myTable') as any).DataTable({
            language: {
              url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
            }
          });
        }, 1);
      },
      error: (err) => {
        console.error("Error en get_roles()", err);
      }
    });
  }




  seleccionado(event: Event, id_modulo: number) {
    console.log(id_modulo)
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.seleccionados.push(id_modulo)
      console.log("Va asi por ahora", this.seleccionados)
    } else {
      const index = this.seleccionados.indexOf(id_modulo);


      if (index > -1) {
        this.seleccionados.splice(index, 1);
      }
    }


  }




  create_rol() {
    console.log(this.seleccionados)
    console.log(this.descripcion)
    console.log(this.name_m)

    const R_roles = {
      nombre: this.name_m, descripcion: this.descripcion, estado: true
    }

    this.rolesService.createRol(R_roles).subscribe({

      next: (data) => {

        console.log(data)
        this.todos = data
        let v_id = this.todos[0];
        this.create_mxperfil(v_id)


      }, error: (error) => {

      }

    })


  }


  create_mxperfil(id: number) {

    console.log("aca a crear perfil llego v_id", id)

    const R_moduloxperfil = {
      id_rol: id, id_modulo: this.seleccionados, estado: true
    }


    this.moduloxPerfilService.createModuloXPerfil(R_moduloxperfil).subscribe({

      next: (data) => {
        console.log(data)

         const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
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
        title: "rol creado con exito",
      });

      }, error: (error) => {
        console.log("error", error)
      }

    })



  }


  modulos_asignados(rol_id: number) {

  }
}
