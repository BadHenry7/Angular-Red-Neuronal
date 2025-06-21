import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from "../../../Componentes/navbar-doctor/navbar-doctor.component";
import { CommonModule } from '@angular/common';
import { Prueba } from '../../../services/servicios';
declare var $: any;

@Component({
  selector: 'app-citas-medicas',
  imports: [NavbarDoctorComponent, CommonModule],
  templateUrl: './citas-medicas.component.html',
  styleUrl: './citas-medicas.component.css'
})

export class CitasMedicasComponent implements OnInit {
  todos_agenda:any=[]  
  todos: any
  error: string | null = null;
  loading: boolean=false;
  nombre: string="";
  
  constructor (private agenda: Prueba){}
        
  ngOnInit(): void {
    
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombre = usuario.nombre;
    } 

    this.agenda.getPrueba()
    .subscribe({
      next: (prueba: any)=>{
        this.todos= prueba.citas
        console.log("Citas",this.todos)
        const citas = prueba.citas;
       // console.log("-------PROBANDO------------")
       // 
       // console.log("-------PROBANDO------------")

        //for (let i=0; i<this.todos.length; i++){
          //console.log("-------PROBANDO------------",this.todos[i].paciente)
          //console.log("-------PROBANDO------------",this.todos[i].medico)

          //if(this.nombre===this.todos[i].medico){
            //this.todos_agenda.push(this.todos[i])
          //}
        //}
          //console.log("-------PROBANDO------------",this.todos_agenda)
        this.todos = citas.filter(
          (citas:any) => citas.medico === this.nombre
        );

      },
      error:(err: any)=>{
        console.error(err)
      },
      complete:()=>{
        console.log('completado')
      }
    })
  }

  ngAfterViewInit(): void {
    ($('#myTable') as any).DataTable();
  }
}
