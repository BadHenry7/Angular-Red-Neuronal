import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-doctor',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-doctor.component.html',
  styleUrl: './navbar-doctor.component.css'
})

export class NavbarDoctorComponent implements OnInit {

  nombre: string = "";

  ngOnInit(): void {
      const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombre = usuario.nombre;
    } 
  }
}
