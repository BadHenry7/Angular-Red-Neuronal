import { Component } from '@angular/core';
import { NavbarPacienteComponent } from '../../../Componentes/navbar-paciente/navbar-paciente.component'
import { DynamoDBService } from '../../../services/dynamodb.service';
import { UsersService } from '../../../services/usuarios.service';
import { error } from 'jquery';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-incapacidad',
  imports: [NavbarPacienteComponent],
  templateUrl: './incapacidad.component.html',
  styleUrl: './incapacidad.component.css'
})
export class IncapacidadComponent {

  serviceID = "service_cjysjeb";
  templateID = "template_j4qcj3r";
  apikey = "e4rSWNCpNM-Ie0gbQ";

  constructor(private dynamoDBService: DynamoDBService, private usersService: UsersService) { }

  todos: any = []
  todos2: any = {}
  v_name: string = ''
  random: string = ''
  v_codigo: string=''

  codigo() {
    this.random = (Math.random() + 1).toString(36).substring(4);
    return this.random
  }

  async Validar() {

    const { value: cedula } = await Swal.fire({
      title: "Confirma tu número de cédula",
      input: "number",
      inputLabel: "Tu número de cédula",
      inputPlaceholder: "ingresa tu número de cédula"
    });
    if (cedula) {
      const usuarioguardado = localStorage.getItem("usuario")
      if (usuarioguardado) {
        const usuario = JSON.parse(usuarioguardado);
        const id = usuario.id
        const email= usuario.correo
        const name= usuario.name

        const R_vIncapacidad = {
          id: id, cedula: cedula
        }

        this.usersService.validarIncapacidad(R_vIncapacidad).subscribe({

          next: (data) => {
            console.log("data", data)
            let todos: any = data
            todos = todos.resultado
            if (todos == "Correcto") {
              this.codigo()
              console.log("Asi es correcto", this.random)
              emailjs.init(this.apikey);
              emailjs
                .send(this.serviceID, this.templateID, {
                  name: name,
                  code: this.random,
                  email:email,
                })



                this.mostrarModalValidacion()



            }

          }, error: (error) => {
            console.log("error", error)
          }

        })


        //Swal.fire(`Entered email: ${cedula}`);
      }
    }

  }


  mostrarModalValidacion(){
     Swal.fire({
            title: "Validacion",
            html: `
                        <div class="card-header">Ingrese la clave enviada al correo<div/>
                        <input class="mt-2 form-control" id="v_codigo" ></input>
                    `,
            icon: "warning",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Validar"
        }).then((result) => {
            const codigo  = (document.getElementById('v_codigo') as HTMLInputElement).value;
            if (result.isConfirmed) {
              console.log("validando esto")
              console.log("validando esto", codigo)
              console.log("validando esto", this.random)
                if (codigo == this.random) {
                    this.generarPDF()

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
                           
            }
        });
  }


  generarPDF() {

    const usuarioguardado = localStorage.getItem("usuario")

    if (usuarioguardado) {
      const usuario = JSON.parse(usuarioguardado)
      const id_paciente = usuario.id
      this.v_name = usuario.name
      const R_incapacidad = { id_usuario: Number(id_paciente) }

      this.dynamoDBService.getincapacidadMedica(R_incapacidad).subscribe({


        next: (data) => {

          console.log("data de incapacidad", data)
          this.todos = data
          const r_doctor = {
            id: this.todos[0].id_doctor
          }

          console.log("r_doctor fue", r_doctor)

          this.usersService.getUser(r_doctor).subscribe({

            next: (data) => {
              this.todos2 = data
              console.log("informacion del doctor", this.todos2, this.todos2.nombre, this.todos2.apellido)



              const doc = new jsPDF();
              doc.setFont("helvetica", "bold");
              doc.setFontSize(18);
              doc.text("CERTIFICADO DE INCAPACIDAD MÉDICA", 20, 20);

              doc.setLineWidth(0.5);
              doc.line(20, 25, 190, 25);

              doc.setFont("times", "normal");
              doc.setFontSize(12);
              doc.text(`Estimado/a ${this.v_name}`, 20, 40);

              doc.text(
                `El motivo de la incapacidad es:  ${this.todos[0].descripcion}`,
                20, 50, { maxWidth: 170 }
              );

              doc.text(
                `Por medio del presente, le informamos que debido a su condición médica, se le ha otorgado una incapacidad médica de: `,
                20, 70, { maxWidth: 170 }
              );
              doc.setFont("times", "bold");
              doc.text(`${this.todos[0].dias_de_incapacidad}`, 20, 80);

              doc.setFont("times", "bold");
              doc.text(`A partir de la fecha: ${this.todos[0].fecha}`, 20, 90);

              doc.setFont("times", "normal");
              doc.text(
                `Durante este período, se recomienda reposo absoluto y el seguimiento de las siguientes observaciónes \n ${this.todos[0].observaciones}`,
                20, 100, { maxWidth: 170 }
              );

              doc.text(
                "En caso de requerir una extensión de la incapacidad o presentar síntomas adicionales, le recomendamos acudir nuevamente a consulta médica.",
                20, 125, { maxWidth: 170 }
              );

              doc.text("Atentamente,", 20, 145);
              doc.text(`${this.todos2.nombre} ${this.todos2.apellido}`, 20, 155);
              doc.text("Médico General", 20, 165);

              doc.save("Incapacidad_Medica.pdf");


            }, error: (error) => {
              console.log("error", error)
            }
          })





        }, error: (error) => {
          console.log("error", error)
        }


      })
    }


  }

}
