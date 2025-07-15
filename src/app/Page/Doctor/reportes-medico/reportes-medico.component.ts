import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
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
  selector: 'app-reportes-medico',
  imports: [NavbarDoctorComponent, FormsModule, CommonModule],
  templateUrl: './reportes-medico.component.html',
  styleUrl: './reportes-medico.component.css'
})

export class ReportesMedicoComponent implements OnInit {

  constructor(private citasService: CitasService, private diagnosticoService: DiagnosticoService,
    private userService: UsersService
  ) { }


  calendarInstance: any;
  calendarElement: any;
  ngOnInit(): void {



    if (calendarElement) {
      this.calendarInstance = new coreui.Calendar(calendarElement, {
        locale: "es-ES",
        calendars: 1,
        range: true,
      });
    }
  }



  todos: any = {};
  a: any = {}
  doctores:any = {};
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


  //Esto es cuando le de clic enviar correo
  asunto: String=""
  ms: String=""
  enlace: String=""

  seleccion_doctor: String[]= [];
  seleccionado = [];
  loading_select = false;


  v_change: String=""

  formSubmit(event: any) {
    event.preventDefault();
    this.sendEmail();
   }//


  select_change() { 

  try {
            this.loading_select = false;
            
            

            console.log("funcion select_change", this.v_change);
            this.seleccion_doctor.push(this.v_change);
            this.a = this.seleccion_doctor;
            console.log("funcion push", this.seleccion_doctor);
        } catch (e: any) {
            this.error = e.message;
            console.log(this.error);
        } finally {
            this.loading_select = true;
        }


  }



  Ocultar() {
     this.seleccion_doctor= []
     this.a= {}
     console.log(this.a, this.seleccion_doctor)
this.loading_select=false
   }



  generar() {

    try {
      this.visualizar = true;
      console.log("esto tiene", this.calendarInstance);
      this.fecha_desde = this.calendarInstance._startDate;
      this.fecha_hasta = this.calendarInstance._endDate;


      console.log("opcion", this.opcion);
      if (this.opcion == 1) {//
        let fecha_1 = new Date(this.fecha_desde);
        let fecha_de = fecha_1.toISOString().split("T")[0];

        let fecha_2 = new Date(this.fecha_hasta);
        let fecha_hasta = fecha_2.toISOString().split("T")[0];
        const fecha = fecha_de;
        const fecha2 = fecha_hasta;
        console.log("fechas---------", fecha, fecha2);
         let miStorage = window.localStorage;
              
                  let usuario = JSON.parse(miStorage.getItem("usuario")?? '{}');
                  let id = usuario.id;
              
        const R_usuario = { fecha, fecha2,id }

        this.citasService.getReportes_citas_medicos(R_usuario).subscribe({
          next: (todos) => {

               

            this.todos = todos
            this.todos = this.todos.resultado;
            console.log(this.todos)

            const doc = new jsPDF();

            var body = [];
            for (let i = 0; i < this.todos.length; i++) {
              console.log("´probando el for ");
              console.log(this.todos[i].fecha);
              body.push([
                this.todos[i].fecha,
                this.todos[i].hora,
                this.todos[i].medico,
                this.todos[i].paciente,
              ]);
              console.log("´probando el for 2");
            }
            doc.setFontSize(35);
            doc.setFont("helvetica");
            doc.text("Hostipal", 76, 20,);
            const docWidth = doc.internal.pageSize.getWidth();
            doc.line(0, 30, docWidth, 30);
            doc.setFontSize(18);
            doc.text(

              "Informacion de las citas registradas en el sistema", 12,
              40,
            );
            var columns = ["fecha", "hora", "medico", "paciente"];
            autoTable(doc, {
              columns: columns,
              body: body,
              margin: { top: 70 },
            });

            const pdfBlob = doc.output("blob");
            this.pdfUrl = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById("pdfvista") as HTMLIFrameElement;
            iframe.src = this.pdfUrl;

            this.pdfvista = this.pdfUrl;

          }, error: (error) => {
            console.log(error)

          }
        });

      } else if (this.opcion == 2) {
        let fecha_1 = new Date(this.fecha_desde);
        let fecha_de = fecha_1.toISOString().split("T")[0];

        let fecha_2 = new Date(this.fecha_hasta);
        let fecha_hasta = fecha_2.toISOString().split("T")[0];
        const fecha = fecha_de;
        const fecha2 = fecha_hasta;
        console.log("fechas---------", fecha, fecha2);
        const R_usuario = { fecha, fecha2 }

        this.diagnosticoService.getReportes_diagnosticos(R_usuario).subscribe({
          next: (todos) => {
            this.todos = todos
            this.todos = this.todos.resultado;
            console.log(this.todos)

            const doc = new jsPDF();

            var body = [];
            for (let i = 0; i < this.todos.length; i++) {
              console.log("´probando el for ");

              body.push([
                this.todos[i].nombre_paciente,
                this.todos[i].resultado,
                this.todos[i].fecha_diagnostico,
              ]);
              console.log("´probando el for 2");
            }
            doc.setFontSize(35);
            doc.setFont("helvetica");
            doc.text("Hostipal", 76, 20,);
            const docWidth = doc.internal.pageSize.getWidth();
            doc.line(0, 30, docWidth, 30);
            doc.setFontSize(18);
            doc.text(

              "Informacion de las citas registradas en el sistema", 12,
              40,
            );
            var columns = ["fecha", "hora", "medico", "paciente"];
            autoTable(doc, {
              columns: columns,
              body: body,
              margin: { top: 70 },
            });

            const pdfBlob = doc.output("blob");
            this.pdfUrl = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById("pdfvista") as HTMLIFrameElement;
            iframe.src = this.pdfUrl;

            this.pdfvista = this.pdfUrl;

          }, error: (error) => {
            console.log(error)

          }
        });

      } else if (this.opcion == 3) {
        let fecha_1 = new Date(this.fecha_desde);
        let fecha_de = fecha_1.toISOString().split("T")[0];

        let fecha_2 = new Date(this.fecha_hasta);
        let fecha_hasta = fecha_2.toISOString().split("T")[0];
        const fecha = fecha_de;
        const fecha2 = fecha_hasta;
        console.log("fechas---------", fecha, fecha2);
        const R_usuario = { fecha, fecha2 }

        this.citasService.getReportes_historial(R_usuario).subscribe({
          next: (todos) => {
            this.todos = todos
            this.todos = this.todos.resultado;
            console.log(this.todos)

            const doc = new jsPDF();

            var body = [];
            for (let i = 0; i < this.todos.length; i++) {
              console.log("´probando el for ");

              body.push([
                 this. todos[i].nombre,
                       this.  todos[i].numero_citas,
                        this. todos[i].Ultimodiagnostio,
              ]);
              console.log("´probando el for 2");
            }
            doc.setFontSize(35);
            doc.setFont("helvetica");
            doc.text("Hostipal", 76, 20,);
            const docWidth = doc.internal.pageSize.getWidth();
            doc.line(0, 30, docWidth, 30);
            doc.setFontSize(18);
            doc.text(

              "Informacion de las citas registradas en el sistema", 12,
              40,
            );
            var columns = ["Paciente", "Diagnóstico", "Fecha de diagnóstico"];
            autoTable(doc, {
              columns: columns,
              body: body,
              margin: { top: 70 },
            });

            const pdfBlob = doc.output("blob");
            this.pdfUrl = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById("pdfvista") as HTMLIFrameElement;
            iframe.src = this.pdfUrl;

            this.pdfvista = this.pdfUrl;

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

  select_doctor() {


     try {
           
      this.userService.getMedico().subscribe({
          next: (todos) => {

           this.doctores = todos;
           this.doctores=this.doctores.resultado;

            const select_doctor = document.getElementById("select_email")
            if (select_doctor){
              select_doctor.innerHTML = "<option>Eliga un medico</option>";
              
              console.log(this.doctores[0]);
              for (let i = 0; i < this.doctores.length; i++) {
                const doctor_v = this.doctores[i];
                const option = document.createElement("option");
                option.value = doctor_v.usuario;
                option.textContent = doctor_v.nombre;
                select_doctor.appendChild(option);
              }
              
            }


          }, error: (error) => {
            console.log(error)

          }
        });

           
        } catch (e: any) {
           this. error = e.message;
            console.log(this.error);
        }



  }

  sendEmail() {
    for (let i = 0; i < this.seleccion_doctor.length; i++) {
      let ce = this.seleccion_doctor[i];

      emailjs.init(this.apikey);
      emailjs
      .send(this.serviceID, this.templateID, {
          asunto: this.asunto,
          email: ce,
          file: this.enlace,
          message: this.ms,
      })
      .then((result) => {
          
 const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast: any) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          iconColor: "#000000",
          color: "black",
          background: "#76fa78",
          title: "usuario activado con exito",
        });

      })
      .catch((error) => {
          console.log("Error al enviar el correo:", error.text);
      });
    }
  }



}
