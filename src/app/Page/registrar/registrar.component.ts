import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NavbarindexComponent} from '../../Componentes/navbarindex/navbarindex.component'
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  imports: [RouterLink , NavbarindexComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
valido: string="";

//Declaracion del formulario reactivo
RegisterForm: FormGroup;

constructor (private rg: FormBuilder){
//Creacion del registro de usuarios con tres campos:
// -nombre, apellido, documento, telefono, genero, edad, usuario, contraseña

  this.RegisterForm = this.rg.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
    v_nombre: ['', [Validators.required,  Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
    v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
    v_documento: ['', [Validators.required,Validators.pattern('^[0-9]{6,12}$')]],
    v_telefono: ['', [Validators.required,Validators.pattern('^[0-9]{7,10}$')]],
    v_genero: ['', [Validators.required]],
    v_edad: ['', [Validators.required,Validators.min(0),Validators.max(120)]],
    v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    v_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20),Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&.])[A-Za-z+\\d@$!%*?&.]{6,}$')
  ]]
  //v_nombre: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
  })

}


  //
  registrar(){
      //Obtencion del formulario:
  const nombre= String(this.RegisterForm.value.v_nombre);
  const apellido= String(this.RegisterForm.value.v_apellido);
  const documento= String(this.RegisterForm.value.v_documento);
  const telefono= String(this.RegisterForm.value.v_telefono);
  const genero= String(this.RegisterForm.value.v_genero);
  const edad= String(this.RegisterForm.value.v_edad);
  const usuario= String(this.RegisterForm.value.v_usuario);
  const password= String(this.RegisterForm.value.v_password);



  }




}
