import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ModuloService } from '../../services/modulo.service';
import { error } from 'jquery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-administrador',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './navbar-administrador.component.html',
  styleUrl: './navbar-administrador.component.css'
})
export class NavbarAdministradorComponent implements OnInit {

  constructor(private router: Router, private moduloService: ModuloService) { }

  henry: boolean = true
  image: String = ''
  name: string = 'Usuario'
  rol: number = 0
  todos: any=[]
  ngOnInit(): void {

    const usuarioGuardado = localStorage.getItem('usuario')

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado)
      this.name = usuario.name;
      this.rol = usuario.rol;
    }
    this.mostrar_modulos(this.rol)

  }

  mostrar_modulos(id_rol: number) {

    const R_modulos = {
      id: id_rol
    }

    this.moduloService.getModulosAsignados(R_modulos).subscribe({

      next: (data) => {
        this.todos=data
        this.todos=this.todos.resultado
        console.log(this.todos)

      }, error: (error) => {
        console.log("Error", error)
      }

    })

  }

  confirmacion() {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se perdera lo que no hayas guardado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/']);

        // window.location.href = "/";
      }
    });

  }

}
