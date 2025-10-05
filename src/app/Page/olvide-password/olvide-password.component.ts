import { Component } from '@angular/core';
import { NavbarindexComponent } from '../../Componentes/navbarindex/navbarindex.component';
import { UsersService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-olvide-password',
  imports: [NavbarindexComponent, CommonModule, FormsModule],
  templateUrl: './olvide-password.component.html',
  styleUrl: './olvide-password.component.css'
})
export class OlvidePasswordComponent {

  constructor(private userService: UsersService) { }

  serviceID = "service_jqiybh4";
  templateID = "template_qe2zk3b";
  apikey = "v9PFHVXKuXWnRt_pX";
  cn1: string = ""
  vl_correo: string = ""
  vr: string = ''
  todos: any = []

  codigo() {
    this.vr = (Math.random() + 1).toString(36).substring(4);
    return this.vr
  }

  enviar_email() {
    emailjs.init(this.apikey);
    emailjs
      .send(this.serviceID, this.templateID, {
        code: this.vr,
        email: this.vl_correo,
      })
      .then((result) => {
        console.log(result.text);
        this.mostrarModalValidacion();

      })
      .catch((error) => {
        console.log(error.text);

      });

  }

  buscar_correo() {

    const R_usuario = {
      usuario: this.vl_correo
    }

    console.log(R_usuario);

    this.userService.olvidePassword(R_usuario).subscribe({

      next: (data) => {

        console.log(data);
        this.codigo();
        this.enviar_email();

      },

      error: (e) => {
        console.error(e);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error en el servidor",
        });
      },
    })

  }

  cambiar_contrasena(cn1: string) {

    const R_usuario = {
      usuario: this.vl_correo,
      nuevo_password: cn1
    }

    this.userService.updatePassword(R_usuario).subscribe({
      next: (data) => {
        console.log(data);
        this.todos = data
        this.todos = this.todos.resultado
        if (this.todos == "Password_actualizado") {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Contraseña cambiada exitosamente",
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Error al cambiar la contraseña",
          });
        }


      },

      error: (e) => {
        console.error(e);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error en el servidor",
        });
      }

    })

  }

  mostrarModalValidacion() {
    Swal.fire({
      title: "Validacion",
      html: `
      <div class="card-header">Ingrese la clave enviada al correo</div>
      <input class="mt-2 form-control" id="ingaturrona">
    `,
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Validar",
      preConfirm: () => {
        const input = (document.getElementById("ingaturrona") as HTMLInputElement).value;
        if (!input) {
          Swal.showValidationMessage("Debe ingresar la clave");
          return false;
        }
        return input;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const f = result.value;
        if (f == this.vr) {
          Swal.fire({
            title: "Cambio de clave",
            html: `
            <div class="card-header">Ingrese su nueva clave</div>
            <input type="password" class="mt-2 form-control" id="clave_nueva_1">
           `,
            icon: "warning",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Validar",
            preConfirm: () => {
              const input = (document.getElementById("clave_nueva_1") as HTMLInputElement).value;
              if (!input) {
                Swal.showValidationMessage("Debe ingresar la nueva clave");
                return false;
              }

              const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,20}$/;
              console.log("Validando input", input)
              if (!regex.test(input)) {
                console.log("Entra al si todavia")

                Swal.showValidationMessage(
                  "La clave debe tener entre 6 y 20 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial."
                );
                return false;
              }else{
                console.log("Entra al sino")
               
              }

              return input;
            }
          }).then((result2) => {
            console.log("Si entra aca RESULT 2")
            if (result2.isConfirmed) {
              const cn1 = result2.value;
              console.log("Si entra aca RESULT 3", cn1)
              this.cambiar_contrasena(cn1);
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "El codigo es incorrecto... Por favor, intentalo de nuevo.",
            icon: "error"
          }).then(() => {
            this.mostrarModalValidacion();
          });
        }
      } else if (result.isDismissed) {
        // Si quieres manejar el dismiss aquí, agrégalo
      }
    });
  }





}
