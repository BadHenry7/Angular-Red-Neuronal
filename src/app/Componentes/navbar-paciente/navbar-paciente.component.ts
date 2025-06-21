import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-paciente',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-paciente.component.html',
  styleUrl: './navbar-paciente.component.css'
})

export class NavbarPacienteComponent implements OnInit {

  nombre: string = "";

  ngOnInit(): void {
      const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombre = usuario.nombre;
    } 
  }

}
