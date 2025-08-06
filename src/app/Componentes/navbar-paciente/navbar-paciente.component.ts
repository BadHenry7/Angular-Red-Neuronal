import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar-paciente',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-paciente.component.html',
  styleUrl: './navbar-paciente.component.css'
})

export class NavbarPacienteComponent implements OnInit {

  constructor(private router: Router) { }

  nombre: string = "Paciente";

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombre = usuario.name;
    }
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
