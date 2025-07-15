import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';//Para usar ngIf o ngFor
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/usuarios.service';
declare var Swal : any

@Component({
  selector: 'app-create',
  imports: [NavbarAdministradorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent {
v_same_password: string=''
passwordInsegura:string=''
todos: any=[]
valido: string="";
RegisterAdminForm: FormGroup;

constructor (private rga: FormBuilder, private userService: UsersService){

    this.RegisterAdminForm = this.rga.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
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

 registrar(){
    //Obtencion del formulario:
  const nombre= String(this.RegisterAdminForm.value.v_nombre);
  const apellido= String(this.RegisterAdminForm.value.v_apellido);
  const documento= String(this.RegisterAdminForm.value.v_documento);
  const telefono= String(this.RegisterAdminForm.value.v_telefono);
  const genero= String(this.RegisterAdminForm.value.v_genero);
  const edad= Number(this.RegisterAdminForm.value.v_edad);
  const usuario= String(this.RegisterAdminForm.value.v_usuario);
  const password= String(this.RegisterAdminForm.value.v_password);
 const estado=Boolean(1);
  const id_rol= Number(2);

  const R_usuario={
    nombre,  apellido, documento, telefono, genero, edad, usuario, password, estado, id_rol
  }


 this.userService.addUser(R_usuario).subscribe({
    next:(todos)=>{
       this.todos = todos;
  console.log(this.todos.Informacion);

  if(this.todos.Informacion!="Ya_existe"){

    
Swal.fire({
  title: "Registrado",
  icon: "success",
  draggable: true
});

    this.RegisterAdminForm.reset();


  }else{

  
      Swal.fire({
        title: "El usuario ya se encuentra registrado",
        icon: "error",
        draggable: true
      });
    }



    },error: (error)=>{
      console.log(error)
    } 
        
    ,

  })


  console.log("Datos a registrar:"+"\n"+nombre+"\n"+apellido+"\n"+documento+"\n"+telefono+"\n"+genero+"\n"+edad
    +"\n"+usuario+"\n"+password
  )
 }



}
