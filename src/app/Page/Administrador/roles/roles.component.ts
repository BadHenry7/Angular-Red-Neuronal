import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../services/rol.service';
import { ModuloService } from '../../../services/modulo.service';
import DataTables from 'datatables.net';

@Component({
  selector: 'app-roles',
  imports: [NavbarAdministradorComponent, FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  constructor(private rolesService: RolesService, private moduloService: ModuloService) { }


  loading: boolean = true;
  error: null = null;
  todos: any = {}
  t_roles: any = []
  todos_modulos: any = {}
  seleccionados: any = [];

  todos_info: any = {}
  todos_mxp: any = {}
  rol_v = 0




  ngOnInit(): void {
    this.loading=false;

    this.loadUsers()
  }

  loadUsers(): void {
    
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







  create_rol() {

  }


  modulos_asignados(rol_id: number) {

  }
}
