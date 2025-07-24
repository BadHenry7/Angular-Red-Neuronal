import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarindexComponent } from '../../Componentes/navbarindex/navbarindex.component'
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/usuarios.service';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-registrar',
  imports: [RouterLink, NavbarindexComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  valido: string = "";
  todos: any = []
  //Declaracion del formulario reactivo
  RegisterForm: FormGroup;

  constructor(private rg: FormBuilder, private userService: UsersService) {
    //Creacion del registro de usuarios con tres campos:
    // -nombre, apellido, documento, telefono, genero, edad, usuario, contraseña

    this.RegisterForm = this.rg.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
      v_nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_documento: ['', [Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      v_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_genero: ['', [Validators.required]],
      v_edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      v_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&.])[A-Za-z+\\d@$!%*?&.]{6,}$')
      ]]
      //v_nombre: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
    })

  }


  //
  registrar() {

    //Obtencion del formulario:
    const nombre = String(this.RegisterForm.value.v_nombre);
    const apellido = String(this.RegisterForm.value.v_apellido);
    const documento = String(this.RegisterForm.value.v_documento);
    const telefono = String(this.RegisterForm.value.v_telefono);
    const genero = String(this.RegisterForm.value.v_genero);
    const edad = Number(this.RegisterForm.value.v_edad);
    const usuario = String(this.RegisterForm.value.v_usuario);
    const password = String(this.RegisterForm.value.v_password);
    const estado = Boolean(1);
    const id_rol = Number(1);

    const R_usuario = {
      nombre, apellido, documento, telefono, genero, edad, usuario, password, estado, id_rol
    }


    this.userService.addUser(R_usuario).subscribe({
      next: (todos) => {
        this.todos = todos;
        console.log(this.todos.Informacion);
      }, error: (error) => {
        console.log(error)
      }

      ,

    })


    console.log("Datos a registrar:" + "\n" + nombre + "\n" + apellido + "\n" + documento + "\n" + telefono + "\n" + genero + "\n" + edad
      + "\n" + usuario + "\n" + password
    )

    this.enviar_correo()


  }

  serviceID = 'service_acpug5r'
  templateID = 'template_0hvvaww'
  apikey = '3bmpPn1S0SLhgotWj'


  enviar_correo() {
    const v_nombre = String(this.RegisterForm.value.v_nombre);
    const v_usuario = String(this.RegisterForm.value.v_usuario);
    emailjs.init(this.apikey);
    emailjs.send(this.serviceID, this.templateID, {
      nombre: v_nombre,
      email: v_usuario,
    })
      .then(result => {
        alert('Correo enviado con éxito!');
      })
      .catch(error => {
        console.log('Error al enviar el correo:', error.text);
      });
  }


 


}
