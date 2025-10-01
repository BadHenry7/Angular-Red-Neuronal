import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/usuarios.service';
import { AtribxUsuarioService } from '../../../../services/atribxusuario.service';
import { Especialidades } from '../../../../interfaces/atribxusaurio';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser'

declare var Swal: any

@Component({
  selector: 'app-regis-medicos',
  imports: [NavbarAdministradorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './regis-medicos.component.html',
  styleUrl: './regis-medicos.component.css'
})

export class RegisMedicosComponent implements OnInit {

  todos_especialidades: any;
  loadingEspecialidades = true;
  errorLoading = '';
  v_same_password: string = ''
  passwordInsegura: string = ''
  todos_resp: any
  valido: string = "";
  RegisterAdminForm: FormGroup;

  constructor(private rga: FormBuilder, private userService: UsersService, private atribxUsuario: AtribxUsuarioService) {
    this.RegisterAdminForm = this.rga.group({//requerido, valores nulos, expresiones regulares, minimo y maximo
      v_nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
      v_documento: ['', [Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      v_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      v_genero: ['', [Validators.required]],
      v_edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      v_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&.])[A-Za-z+\\d@$!%*?&.]{6,}$')]],
      v_especialidad: ['Agente', [Validators.required]],
      v_same_password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadatributes();
  }

  loadatributes(): void {
    this.atribxUsuario.getEspecialidades().subscribe({
      next: (todos) => {
        this.todos_resp = todos;
        this.todos_especialidades = this.todos_resp.data
        console.log(this.todos_especialidades)
        // this.loadingEspecialidades = false;
      },
      error: err => {
        console.error(err);
        this.errorLoading = 'No se pudieron cargar las especialidades';
        // this.loadingEspecialidades = false;
      }
    });
  }


  registrar() {


    //Obtencion del formulario:
    const nombre = String(this.RegisterAdminForm.value.v_nombre);
    const apellido = String(this.RegisterAdminForm.value.v_apellido);
    const documento = String(this.RegisterAdminForm.value.v_documento);
    const telefono = String(this.RegisterAdminForm.value.v_telefono);
    const genero = String(this.RegisterAdminForm.value.v_genero);
    const edad = Number(this.RegisterAdminForm.value.v_edad);
    const usuario = String(this.RegisterAdminForm.value.v_usuario);
    const password = String(this.RegisterAdminForm.value.v_password);
    const v_same_password = String(this.RegisterAdminForm.value.v_same_password);
    const estado = Boolean(1);
    const id_rol = Number(2);


    if (password !== v_same_password) {
   
      Swal.fire({
        title: "No se pudo registrar",
        text: "Por favor verifique que las contraseñas coincidan",
        icon: "error",
      });
      return;
    }

    const doctor_creado = {
      nombre, apellido, documento, telefono, genero, edad, usuario, password, estado, id_rol
    }

    this.userService.addUser(doctor_creado).subscribe({
      next: (todos_resp) => {
        this.todos_resp = todos_resp;
        const id_usuario = this.todos_resp.id
        console.log(id_usuario)
        console.log(this.todos_resp.Informacion);

        if (this.todos_resp.Informacion != "Ya_existe") {
          console.log("Entra aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");


          if (!id_usuario) {
            Swal.fire({ title: 'Error creando usuario', icon: 'error' });
            return;
          }



        } else {
          console.log("Entra aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii22222222222222222222");
          Swal.fire({
            title: "No se pudo registrar",
            text: "El siguiente usuario ya se encuentra registrado en el sistema, por favor use otro",
            icon: "error",
          });
          return;
        }




        const atributo = {
          id: 0,
          id_usuario: id_usuario,
          id_atributo: 1,
          valor: this.RegisterAdminForm.value.v_especialidad,
          descripcion: this.RegisterAdminForm.value.v_especialidad,
          estado: true
        };
        console.log("atributo", atributo)

        this.atribxUsuario.addAtrXUse(atributo).subscribe({
          next: (todos) => {
            this.todos_resp = todos;
            console.log(this.todos_resp.resultado);
            if (this.todos_resp.resultado === 'Atributoxusuario ingresado') {

              Swal.fire({
                title: 'Medico registrado',
                icon: 'success',
                draggable: true
              });

              this.RegisterAdminForm.reset();
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo registrar el usuario. Inténtalo de nuevo.',
              icon: 'error',
            });
            console.log(error)
          }
        });
      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  serviceID = 'service_acpug5r'
  templateID = 'template_0hvvaww'
  apikey = '3bmpPn1S0SLhgotWj'


  enviar_correo() {
    const v_nombre = String(this.RegisterAdminForm.value.v_nombre);
    const v_usuario = String(this.RegisterAdminForm.value.v_usuario);
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