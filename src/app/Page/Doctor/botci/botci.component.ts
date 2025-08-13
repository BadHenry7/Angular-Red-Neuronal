import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
import { BotciService } from '../../../services/botci.service';
@Component({
  selector: 'app-botci',
  imports: [NavbarDoctorComponent, CommonModule, FormsModule],
  templateUrl: './botci.component.html',
  styleUrl: './botci.component.css'
})



export class BotciComponent implements OnInit {

  constructor(private botciService: BotciService) { }

  sintomas: string[] = []; // Lista de síntomas obtenida del backend
  seleccionados: string[] = [];; // Lista de síntomas seleccionados

  enfermedad = null; // Resultado de la predicción
  filtro = ""; // Para la búsqueda en tiempo real
  probabilidad = null;
  // Cargar los síntomas al montar el componente


  ngOnInit(): void {
    this.cargarSintomas();
  }

  async cargarSintomas() {
    try {

      this.botciService.get_symptoms().subscribe({
        next: (data) => {
          console.log(data)
          this.sintomas = [...data.sintomas];
        }, error: (error) => {
          console.log("error: ", error)
        }
      });




    } catch (error) {
      console.error("Error al cargar los síntomas:", error);
    }
  }


  async mostrar(data: any[]) {
    // Swal.fire("Tiene  un " + probabilidad+" de probabilidad de tener "+enfermedad);
    let mensaje = "<b>Resultados de la predicción:</b>\n";
    let mensaje2="El usuario cuenta con otras probabilidades de tener:\n";
    if (data.length >= 1) {
      mensaje += data[0].enfermedad + ": " + data[0].probabilidad + "\n";
    }
    if (data.length >= 2) {
      mensaje2 += data[1].enfermedad + ": " + data[1].probabilidad + "\n";
    }
    if (data.length >= 3) {
      mensaje2 += data[2].enfermedad + ": " + data[2].probabilidad + "\n";
    }

    Swal.fire({
      title: mensaje,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "purple",
      cancelButtonText: "Ok",

      confirmButtonText: "Ver otra predición"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: mensaje2,
       
        });
      }
    });
  }


  manejarCambioCheckbox(e: any, sintoma: string) {
    const checked = e.target.checked;
    if (checked) {
      if (!this.seleccionados.push(sintoma)) {
        this.seleccionados = [...this.seleccionados, sintoma];
      }

    } else {
      this.quitarSintoma(sintoma);
    }


  }



  async predecir() {
    try {
      if (this.seleccionados.length <= 3) {
        Swal.fire({
          title: "Síntomas insuficientes",
          text: "Seleccione al menos 4 síntomas para predecir.",
          icon: "warning",
          showConfirmButton: false,
          timer: 3500
        });
        return
      }

      const selected_symptoms = this.seleccionados
      const R_botci = {
        selected_symptoms
      }

      this.botciService.predict_disease(R_botci).subscribe({
        next: (data) => {

        }, error: (error) => {
          console.log("error:", error)
        }
      })

      const res = await fetch("https://red-neuronal-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_symptoms: this.seleccionados }),
      });
      const data = await res.json();
      // enfermedad = data.enfermedad;
      // probabilidad= data.probabilidad;
      this.mostrar(data);
    } catch (error) {
      console.error("Error al predecir la enfermedad:", error);
    }
  }

  quitarSintoma(sintoma: string) {
    this.seleccionados = this.seleccionados.filter((s) => s !== sintoma);
  }

  // Filtrar síntomas en tiempo real
  get sintomasFiltrados(): string[] {
    return this.sintomas.filter(s =>
      s.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
