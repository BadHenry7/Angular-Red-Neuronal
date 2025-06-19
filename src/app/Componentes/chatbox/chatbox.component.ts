import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
loading:boolean =false
mensaje: string=""
v_persona: string=""
image: string=""
mensajes: any[] = [];   

}
