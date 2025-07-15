import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
declare var coreui: any;
declare var calendarInstance: any;
declare var bootstrap: any;
declare var calendarElement: any;
declare var exportesModal: any


@Component({
  selector: 'app-reportes',
  imports: [NavbarAdministradorComponent, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {

  ngOnInit(): void {



    if (calendarElement) {
      const calendarInstance = new coreui.Calendar(calendarElement, {
        locale: "es-ES",
        calendars: 1,
        range: true,
      });
    }
  }



  todos = {};
  a: any = {}
  doctores = {};
  loading = true;
  error = null;

  opcion: String = "";
  fecha_de = "";
  fecha_hasta = "";
  fecha_desde = "";
  hasta_fecha = "";
  serviceID = "service_yev294m";
  templateID = "template_833f5mc";
  apikey = "gVmq9ZyZNWP2_LzXW";
  pdfUrl = "";

  visualizar = null
  seleccion_doctor = [];
  seleccionado = [];
  loading_select = false;

  formSubmit() { }

  select_change() { }
  Ocultar() { }



  generar() {

  }

  select_doctor() {

  }
}
