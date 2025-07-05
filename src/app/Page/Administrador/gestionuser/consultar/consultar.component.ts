import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { User, UsersService } from '../../../../services/usuarios.service';
//HttpClient
@Component({
  selector: 'app-consultar',
  imports: [ CommonModule, FormsModule, NavbarAdministradorComponent],
  templateUrl: './consultar.component.html',
  //standalone: true,
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit{

  error: String|null= null;
  loading: Boolean= false

  todos: User[] =[];
  
  constructor (private userService: UsersService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void{
    this.userService.getUsers().subscribe(todos =>{ this.todos = todos;
      console.log(this.todos);
    });
    
    

    

  }
  
}
