import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';
import { UsersService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-administrador-principal',
  imports: [NavbarAdministradorComponent, ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './administrador-principal.component.html',
  styleUrl: './administrador-principal.component.css'
})
export class AdministradorPrincipalComponent implements OnInit {
  henry: boolean = true
  image: String = ''
  todos: any
  PerfilAdminForm: FormGroup;

  id: number = 0




  constructor(private userService: UsersService, private PerfilAdmin: FormBuilder) {
    this.PerfilAdminForm = this.PerfilAdmin.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      v_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      id_rol: ['', [Validators.required]],
      v_estado: ['', [Validators.required]],
      v_genero: ['', [Validators.required]],
      v_estatura: ['', [Validators.required]],
      v_edad: ['', [Validators.required]],
      v_password: ['00000000']


    })
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.id = usuario.id;
    }


    const R_usuario = {
      id: this.id
    }

    this.userService.getUser(R_usuario).subscribe({
      next: (data) => {

        console.log(data)
        this.todos = data
        this.PerfilAdminForm.patchValue({

          v_nombre: this.todos.nombre,
          v_apellido: this.todos.apellido,
          v_documento: this.todos.documento,
          v_telefono: this.todos.telefono,
          v_usuario: this.todos.usuario,
          id_rol: this.todos.id_rol,
          v_estado: this.todos.estado,
          v_genero: this.todos.genero,
          v_estatura: this.todos.estatura,
          v_edad: this.todos.edad,
         




        })


      }, error: (error) => {

      }

    });


  }

  Actualizar() {




    //Obtencion del formulario:
    const nombre = String(this.PerfilAdminForm.value.v_nombre);
    const apellido = String(this.PerfilAdminForm.value.v_apellido);
    const documento = String(this.PerfilAdminForm.value.v_documento);
    const telefono = String(this.PerfilAdminForm.value.v_telefono);
    const genero = String(this.PerfilAdminForm.value.v_genero);
    const edad = Number(this.PerfilAdminForm.value.v_edad);
    const usuario = String(this.PerfilAdminForm.value.v_usuario);
    const password = String(this.PerfilAdminForm.value.v_password);
    const estado = Boolean(1);
    const id_rol = Number(this.PerfilAdminForm.value.id_rol);
    const estatura= String(this.PerfilAdminForm.value.v_estatura);

    const R_usuario = {
      nombre, apellido, documento, telefono, genero, edad, usuario, password, estado, id_rol, id: this.id, estatura
    }


    this.userService.UpdateAdm(R_usuario).subscribe({
      next: (todos) => {
        this.todos = todos;
        console.log(this.todos);

        if (this.todos.resultado === "Usuario actualizado correctamente") {


          Swal.fire({
            title: "Usuario actualizado",
            icon: "success",
            draggable: true
          });

          this.sendSMS()


        } else {


          Swal.fire({
            title: "Documento o correo ya se encuentra registrado",
            icon: "error",
            draggable: true
          });
        }



      }, error: (error) => {
        console.log(error)
      }

      ,

    })


    console.log("Datos a registrar:" + "\n" + nombre + "\n" + apellido + "\n" + documento + "\n" + telefono + "\n" + genero + "\n" + edad
      + "\n" + usuario + "\n" + password
    )

  }


  sendSMS() {

    const R_SMS = {
      phoneNumber: "+573205158257",
      message: "Hola, su informacion fue cambiada, revise su cuenta"
    }
    this.userService.sendSMS(R_SMS).subscribe({


      next: (data) => {
         console.log("Respuesta del servidor:", data);

      }, error: (error) => {
        console.log("error", error)
      }

    })

  }


}
