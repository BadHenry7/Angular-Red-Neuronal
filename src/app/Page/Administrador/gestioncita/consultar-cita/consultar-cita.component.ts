import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { CommonModule } from '@angular/common';
import { Prueba } from '../../../../services/servicios';
declare var $: any;
@Component({
  selector: 'app-consultar-cita',
  imports: [NavbarAdministradorComponent, CommonModule],
  templateUrl: './consultar-cita.component.html',
  styleUrl: './consultar-cita.component.css'
})
export class ConsultarCitaComponent implements OnInit{

todos: any
error: string | null = null;
loading: boolean=false

constructor(private cita: Prueba){}

  ngAfterViewInit(): void {
    ($('#myTable') as any).DataTable();
  }

 ngOnInit(): void {
    this.cita.getPrueba()
    .subscribe({
      next: (prueba: any)=>{
        this.todos= prueba.citas
        console.log(this.todos.citas)
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
