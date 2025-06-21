import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';//para usar ngModel
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';//Para usar router navigate
import { Prueba } from '../../services/servicios';
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
  todos: any;
  verificar: boolean=false;

  //Se crea un constructor, siempre va asi contructor (private nombre_variable){}  -->Segun entendi espera a que cargue el doom o algo asi
  constructor(private prueba: Prueba, private router: Router) { }//supuestamente sirve para usar el router.navigate que evita recargar la pagina con window.location.href



  ngOnInit(): void {
    this.prueba.getPrueba()
      .subscribe({
        next: (prueba: any) => {
          this.todos = prueba
          console.log(this.todos)

         

        },
        error: (err: any) => {
          console.error(err)
        },
        complete: () => {
          console.log('completado')
        }
      })
  }


  iniciar() {
    let todo= this.todos.users
    console.log(todo[0].nombre)
    console.log(todo[0].usuario)
    console.log(todo[0].password)
    console.log(this.correo)
    console.log(this.password)


    for (let i=0; i<todo.length; i++){
    if (todo[i].usuario == this.correo && todo[i].password == this.password) {
    this.verificar=true;
    console.log("*//////////////",todo[i].rol)
        let encontrado = {nombre:todo[i].nombre, correo: this.correo, password: this.password };//sin el this. no funciona
            console.log("Imprimos el encontrado", encontrado);
            let miStorage = window.localStorage;
            miStorage.setItem("usuario", JSON.stringify(encontrado));

            if (todo[i].rol == "Administrador") {

              this.router.navigate(['administrador/principal']);

            } else if (todo[i].rol == "Paciente") {
              this.router.navigate(['pacientes/principal']);

            } else {
              this.router.navigate(['doctor/principal']);
            }

          }
    }

    if (this.verificar!=true){
      alert("La combinacion entre usuario y contraseña es incorrecta ehhh")
    }

    
  
  

  }



}






// }
