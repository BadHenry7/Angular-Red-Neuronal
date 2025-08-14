import { Component } from '@angular/core';
import { NavbarPacienteComponent } from '../../../Componentes/navbar-paciente/navbar-paciente.component'
import { DynamoDBService } from '../../../services/dynamodb.service';
import { UsersService } from '../../../services/usuarios.service';
import { error } from 'jquery';
  import jsPDF from 'jspdf';

@Component({
  selector: 'app-incapacidad',
  imports: [NavbarPacienteComponent],
  templateUrl: './incapacidad.component.html',
  styleUrl: './incapacidad.component.css'
})
export class IncapacidadComponent {


  constructor(private dynamoDBService: DynamoDBService, private usersService:UsersService) { }

todos: any=[]
todos2: any={}
v_name: string=''

  generarPDF() {

    const usuarioguardado = localStorage.getItem("usuario")

    if (usuarioguardado) {
      const usuario = JSON.parse(usuarioguardado)
      const id_paciente = usuario.id
      this.v_name=usuario.name
      const R_incapacidad = { id_usuario: Number(id_paciente) }

      this.dynamoDBService.getincapacidadMedica(R_incapacidad).subscribe({


        next: (data) => {

          console.log("data de incapacidad", data)
          this.todos = data
          const r_doctor={
            id: this.todos[0].id_doctor
          }

          console.log("r_doctor fue",r_doctor)

          this.usersService.getUser(r_doctor).subscribe({

              next:(data)=>{
                this.todos2=data
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


              }, error: (error)=>{
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
