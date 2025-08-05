import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';
import { UsersService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-administrador-principal',
  imports: [NavbarAdministradorComponent, ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './administrador-principal.component.html',
  styleUrl: './administrador-principal.component.css'
})
export class AdministradorPrincipalComponent implements OnInit {
  henry: boolean = true
  image: String = ''
  todos:any
  PerfilAdminForm: FormGroup;





  constructor(private userService: UsersService, private PerfilAdmin: FormBuilder) {
    this.PerfilAdminForm = this.PerfilAdmin.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      v_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      id_rol: ['', [Validators.required]],
      v_estado: ['', [Validators.required]],

    })
  }


  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    let id: number = 0
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      id = usuario.id;
    }


    const R_usuario = {
      id
    }

    this.userService.getUser(R_usuario).subscribe({
      next: (data) => {

        console.log(data)
        this.todos=data
        this.PerfilAdminForm.patchValue({
        
          v_nombre: this.todos.nombre,
          v_apellido: this.todos.apellido,
          v_documento: this.todos.documento,
          v_telefono: this.todos.telefono,
          v_usuario: this.todos.usuario,
          id_rol: this.todos.id_rol,
          v_estado: this.todos.estado

          

        })


      }, error: (error) => {

      }

    });


  }



}
