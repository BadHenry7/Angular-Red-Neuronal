import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';//para usar ngModel
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';//Para usar router navigate
import { User, UsersService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  //Se definen las variables
  loading: boolean = false;
  error: string | null = null;

  //Del formulario
  correo: string = '';
  password: string = '';
  nombre: string = '';
  todos: any = [];
  verificar: boolean = false;

  //Se crea un constructor, siempre va asi contructor (private nombre_variable){}  -->Segun entendi espera a que cargue el doom o algo asi
  constructor(private router: Router, private userService: UsersService) { }//supuestamente sirve para usar el router.navigate que evita recargar la pagina con window.location.href

  ngOnInit(): void {

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);

    });
  }



  iniciar() {

    const usuario = {
      usuario: this.correo,
      password: this.password
    };//this.userService.Login(usuario).subscribe(todos =>{ this.todos = todos;
    this.userService.Login(usuario).subscribe({
      next: (todos) => {
        console.log("entroo")
        this.todos = todos;
        if (this.todos.resultado && this.todos.resultado.length > 0) {
          console.log(this.todos.resultado);


          let todo = this.todos.resultado;

          console.log(todo[0].nombre);
          console.log(todo[0].usuario)
          console.log(todo[0].password)
          console.log(this.correo)
          console.log(this.password)



          this.verificar = true;
          console.log("*//////////////", todo[0].rol)
          let encontrado = { name: todo[0].nombre, correo: this.correo, password: this.password, id: todo[0].id};
          console.log("Imprimos el encontrado", encontrado);
          let miStorage = window.localStorage;
          miStorage.setItem("usuario", JSON.stringify(encontrado));

          if (todo[0].rol == 1) {

            this.router.navigate(['administrador/principal']);

          } else if (todo[0].rol == 2) {
            this.router.navigate(['pacientes/principal']);

          } else {
            this.router.navigate(['doctor/principal']);
          }



        } else {
          alert("La combinacion entre usuario y contraseña es incorrecta ehhh")
        }




      }, error: (error) => {
        if (error.status === 404) {
          alert("Usuario o contraseña incorrectos.");
        } else {
          console.log("Error del servidor: " + error.status);
        }
      }
    });
  }
}






// }
