import { Component, OnInit } from '@angular/core';
import { NavbarindexComponent } from '../../../../Componentes/navbarindex/navbarindex.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Prueba } from '../../../../services/servicios';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
//HttpClient
@Component({
  selector: 'app-consultar',
  imports: [ CommonModule, FormsModule, NavbarAdministradorComponent],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit{
  //todos: any[] = [];  
    loading: boolean = false;
  error: string | null = null;
  todos: any;
  constructor(private prueba: Prueba){}

  
  ngOnInit(): void {
    this.prueba.getPrueba()
    .subscribe({
      next: (prueba: any)=>{
        this.todos= prueba.users
        console.log(this.todos.users)
      },
      error:(err: any)=>{
        console.error(err)
      },
      complete:()=>{
        console.log('completado')
      }
    })
    }
   

}
