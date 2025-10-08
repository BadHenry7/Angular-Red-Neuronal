import { Component, OnInit } from '@angular/core';
import { NavbarPacienteComponent } from "../../../Componentes/navbar-paciente/navbar-paciente.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var coreui: any;
declare var calendarElement: any;
declare var $: any;
import Swal from 'sweetalert2'

import { CitasService } from '../../../services/citas.service';
import { DiagnosticoService } from '../../../services/diagnosticos';
import { UsersService } from '../../../services/usuarios.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from '@emailjs/browser'


@Component({
  selector: 'app-reportes-paciente',
  imports: [NavbarPacienteComponent, FormsModule, CommonModule],
  templateUrl: './reportes-paciente.component.html',
  styleUrl: './reportes-paciente.component.css'
})
export class ReportesPacienteComponent implements OnInit {

  constructor(private citasService: CitasService, private diagnosticoService: DiagnosticoService,
    private userService: UsersService
  ) { }


  calendarInstance: any;
  calendarElement: any;
  ngOnInit(): void {

  }



  todos: any = {};
  a: any = {}
  doctores: any = {};
  loading = true;
  error = null;

  //Esto son el select y calendario de Reportes
  opcion: Number = 1;
  fecha_de = "";
  fecha_hasta = "";
  fecha_desde = "";
  hasta_fecha = "";


  //Esto es para el correo
  serviceID = "service_yev294m";
  templateID = "template_833f5mc";
  apikey = "gVmq9ZyZNWP2_LzXW";

  //Esto es para la visualizacion de Frame
  pdfUrl = ""
  pdfvista = ""
  visualizar: boolean = false




  generar() {

    try {
      this.visualizar = true;



      console.log("opcion", this.opcion);
      if (this.opcion == 1) {//
        let miStorage = window.localStorage;

        let usuario = JSON.parse(miStorage.getItem("usuario") ?? '{}');
        let id_paciente = usuario.id;
        let nombre_v = usuario.name;
        const R_usuario = { id_paciente }

        this.citasService.historia_clinica_user(R_usuario).subscribe({
          next: (todos) => {
            this.todos = todos
            this.todos = this.todos.resultado;
            console.log(this.todos)

            const doc = new jsPDF();


            let fecha_v = new Date(this.todos[0].fecha_diagnostico);
            let descsin_v = (this.todos[0].descripcion_sintomas);
            let diag_v = (this.todos[0].diagnostico);
            let sin_v = (this.todos[0].sintomas);
            let obsr_v = (this.todos[0].Observaciontratamiento);
            let doctor_v = (this.todos[0].doictor);
            let paciente_v = nombre_v;

            console.log(fecha_v, descsin_v, diag_v, sin_v, obsr_v, doctor_v, paciente_v)


            doc.setFontSize(80);
            doc.setFont("helvetica", "normal");
            doc.addImage('/assess/image_otro_logo.png', 'PNG', 65, 10, 70, 20); // x, y, width, height
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");

            // Fin del encabezado

            // Detalles de la cita
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Cita del dia: ", 10, 50)
            doc.setFont("helvetica", "normal");
            doc.text("" + fecha_v, 50, 50, { maxWidth: 150 });

            doc.setFont("helvetica", "bold");
            doc.text("Paciente:", 10, 70,);
            doc.setFont("helvetica", "normal");
            doc.text(paciente_v, 50, 70, { maxWidth: 150 });

            // Descripcion del sintoma
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Descripcion de sintomas:", 10, 90, { maxWidth: 40 })
            doc.setFont("helvetica", "normal");
            doc.text(descsin_v, 50, 90, { maxWidth: 150 });


            // Diagnostico
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Diagnostico:", 10, 110);
            doc.setFont("helvetica", "normal");
            doc.text(diag_v, 50, 110, { maxWidth: 150 });

            // Síntomas
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Sintomas:", 10, 130);
            doc.setFont("helvetica", "normal");
            doc.text(sin_v, 50, 130, { maxWidth: 150 });

            // Observaciones
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Observaciones: ", 10, 150);
            doc.setFont("helvetica", "normal");
            doc.text(obsr_v, 50, 150, { maxWidth: 150 });

            // Pie de página
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Doctor", 10, 280)
            doc.setFont("helvetica", "normal");
            doc.text(doctor_v, 25, 280);

            doc.text("Derechos reservados", 105, 280, { align: "center" });

            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);

            this.pdfUrl = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById("pdfvista") as HTMLIFrameElement;
            iframe.src = this.pdfUrl;

            this.pdfvista = this.pdfUrl;

            if (/Mobi|Android/i.test(navigator.userAgent)) {
              window.open(pdfUrl, "_blank");
            }

          }, error: (error) => {
            console.log(error)

          }
        });

      } else if (this.opcion == 2) {
        let miStorage = window.localStorage;

        let usuario = JSON.parse(miStorage.getItem("usuario") ?? '{}');
        let id_paciente = usuario.id;
        const R_usuario = { id_paciente }

        this.citasService.post_citas_users(R_usuario).subscribe({
          next: (todos) => {
            this.todos = todos
            this.todos = this.todos.resultado;
            console.log(this.todos)

            const doc = new jsPDF();


            var body = [];
            for (let i = 0; i < this.todos.length; i++) {
              console.log("´probando el for ");
              body.push([this.todos[i].fecha, this.todos[i].hora, this.todos[i].medico]);
            }
            doc.setFontSize(35);
            doc.setFont("helvetica");
            doc.text("Hostipal", 76, 20,);
            const docWidth = doc.internal.pageSize.getWidth();
            doc.line(0, 30, docWidth, 30);
            doc.setFontSize(18);
            doc.text("Las citas medicas pendientes que tienes son", 12, 40);
            var columns = ["fecha", "hora", "medico"];


            autoTable(doc, {
              startY: 50,
              head: [['Fecha', 'Hora', 'Médico']], // Encabezados
              body: body, // Tu array de arrays con datos
              margin: { top: 70 },
              styles: { fontSize: 10, cellPadding: 2 },
              columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 30 },
                2: { cellWidth: 60 },
              },
              theme: 'grid'
            });

            const pdfBlob = doc.output("blob");
             const pdfUrl = URL.createObjectURL(pdfBlob);
            this.pdfUrl = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById("pdfvista") as HTMLIFrameElement;
            iframe.src = this.pdfUrl;

            this.pdfvista = this.pdfUrl;
             if (/Mobi|Android/i.test(navigator.userAgent)) {
              window.open(pdfUrl, "_blank");
            }

          }, error: (error) => {
            console.log(error)

          }
        });

      }

    } catch (e: any) {
      this.error = e.message;
      console.log(this.error)
    }









  }




}

