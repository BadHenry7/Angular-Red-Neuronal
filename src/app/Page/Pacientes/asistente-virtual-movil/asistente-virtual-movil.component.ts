import { Component } from '@angular/core';
import { ChatboxService } from '../../../services/chatbox.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asistente-virtual-movil',
  imports: [FormsModule,  CommonModule],
  templateUrl: './asistente-virtual-movil.component.html',
  styleUrl: './asistente-virtual-movil.component.css'
})
export class AsistenteVirtualMovilComponent {

 constructor(private chatboxService: ChatboxService) { }

  loading: boolean = false
  mensaje: string = ""
  v_persona: string = ""
  image: string = ""
  mensajes: any[] = [];
  data: any
  mostrarImagen: boolean = true;


  sender: string = '2'//POR AHORA PON CUALQUIER NUMERO


  Enviar() {

    const sender = this.sender;
    const message = this.mensaje;

    const R_usuario = {
      sender, message
    }
    console.log(R_usuario)

    this.chatboxService.Chatbox(R_usuario).subscribe({
      next: (data) => {

        this.data = data;
        console.log(this.data);


        this.loading = true

        if (!this.mensaje.trim()) return;
        this.mensajes = [...this.mensajes, { texto: this.mensaje, emisor: "user" }];

        // Agrega la respuesta del bot al chat
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            this.loading = true;
            // Muestra el loading antes de enviar el mensaje
            console.log("Mostrando loading...");

            setTimeout(() => {
              // Envía el mensaje después de un pequeño retraso
              this.mensajes = [...this.mensajes, { texto: this.data[i].text, emisor: "bot", image: this.data[i].image ? this.data[i].image : null }];
              this.loading = false;
              console.log("Mensaje enviado:", this.data[i].text);
            }, 1000); // Esto simula que mientras loading es true, después de 1 segundo llega el mensaje

          }, i * 3000); // Cada mensaje se envía con 3s de diferencia
        }




        this.mensaje = "";

      }, error: (error) => {
        console.log(error)
      }

      ,

    })
  }




}
