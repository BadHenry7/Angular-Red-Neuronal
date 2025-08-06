import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-principal',
  imports: [NavbarDoctorComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './doctor-principal.component.html',
  styleUrl: './doctor-principal.component.css'
})

export class DoctorPrincipalComponent implements OnInit {

 
  image: String = ''
  todos: any
id: number=0
 

  PerfilDoctorForm: FormGroup;

  constructor(private userService: UsersService, private PerfilDoctor: FormBuilder) {

    this.PerfilDoctorForm = this.PerfilDoctor.group({
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
      v_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&.])[A-Za-z+\\d@$!%*?&.]{6,}$')]]
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
        this.PerfilDoctorForm.patchValue({

          v_nombre: this.todos.nombre,
          v_apellido: this.todos.apellido,
          v_documento: this.todos.documento,
          v_telefono: this.todos.telefono,
          v_usuario: this.todos.usuario,
          id_rol: this.todos.id_rol==2?'Paciente': 'Doctor',
          v_estado: this.todos.estado==1?'Activo': 'Desactivado',
          v_genero: this.todos.genero,
          v_estatura: this.todos.estatura,
          v_edad: this.todos.edad,
          v_password: this.todos.password




        })


      }, error: (error) => {

      }

    });


  }

  Actualizar() {




    //Obtencion del formulario:
    const nombre = String(this.PerfilDoctorForm.value.v_nombre);
    const apellido = String(this.PerfilDoctorForm.value.v_apellido);
    const documento = String(this.PerfilDoctorForm.value.v_documento);
    const telefono = String(this.PerfilDoctorForm.value.v_telefono);
    const genero = String(this.PerfilDoctorForm.value.v_genero);
    const edad = Number(this.PerfilDoctorForm.value.v_edad);
    const usuario = String(this.PerfilDoctorForm.value.v_usuario);
    const password = String(this.PerfilDoctorForm.value.v_password);
    const estado = Boolean(1);
    const id_rol =Number(this.PerfilDoctorForm.value.id_rol);

    const R_usuario = {
      nombre, apellido, documento, telefono, genero, edad, usuario, password, estado, id_rol, id: this.id
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


}
