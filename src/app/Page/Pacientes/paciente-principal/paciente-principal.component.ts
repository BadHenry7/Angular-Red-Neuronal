import { Component, OnInit } from '@angular/core';
import { NavbarPacienteComponent } from "../../../Componentes/navbar-paciente/navbar-paciente.component";
import { ChatboxComponent } from '../../../Componentes/chatbox/chatbox.component'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/usuarios.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-paciente-principal',
  imports: [NavbarPacienteComponent, ChatboxComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './paciente-principal.component.html',
  styleUrl: './paciente-principal.component.css'
})
export class PacientePrincipalComponent implements OnInit {
  image: String = ''
  todos: any
  id: number = 0


  PerfilPacienteForm: FormGroup;


  constructor(private userService: UsersService, private PerfilPaciente: FormBuilder) {

    this.PerfilPacienteForm = this.PerfilPaciente.group({
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

    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado)
      this.id = usuario.id
    }

      const R_usuario = {
      id: this.id
    }

    this.userService.getUser(R_usuario).subscribe({
      next: (data) => {

        console.log(data)
        this.todos = data
        this.PerfilPacienteForm.patchValue({

          v_nombre: this.todos.nombre,
          v_apellido: this.todos.apellido,
          v_documento: this.todos.documento,
          v_telefono: this.todos.telefono,
          v_usuario: this.todos.usuario,
          id_rol: this.todos.id_rol == 2 ? 'Paciente' : 'Doctor',
          v_estado: this.todos.estado == 1 ? 'Activo' : 'Desactivado',
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


  


    

  }


}
