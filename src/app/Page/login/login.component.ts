import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';//para usar ngModel
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';//Para usar router navigate
import { UsersService } from '../../services/usuarios.service';
import { User } from '../../interfaces/usuarios'
import Swal from 'sweetalert2';
import { AuthGoogleService } from '../../auth-google.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthMicrosoftService } from '../../auth-microsoft.service';
declare var grecaptcha: any;

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
  todos2: any = [];
  //Del formulario
  correo: string = '';
  password: string = '';
  nombre: string = '';
  todos: any = [];
  verificar: boolean = false;

  //Se crea un constructor, siempre va asi contructor (private nombre_variable){}  -->Segun entendi espera a que cargue el doom o algo asi
  constructor(private router: Router, private userService: UsersService,
    private authGoogleService: AuthGoogleService,

    private authMicrosoftService: AuthMicrosoftService
  ) { }//supuestamente sirve para usar el router.navigate que evita recargar la pagina con window.location.href


  //var onloadCallback = function() {grecaptcha.render('html_element', {'sitekey' : 'your_site_key'});




  ngOnInit(): void {
    if ((window as any).grecaptcha) {
      (window as any).grecaptcha.render(document.querySelector('.g-recaptcha'), {
        sitekey: '6LeeFo4qAAAAAFIb0Wb5mRE0KWPwaU7xmNEuPfWE'
        // sitekey: '6LdletYqAAAAAN1Insg4lQuDyDO8zO834KBO6nvs'
      });
    }

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);

    });
  }


 async token(){
    
        const response = await fetch("https://red-neuronal-api.onrender.com/generate_token_google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: this.correo,
            }),
        });

        const data = await response.json();
        //return {"access_token": access_token}
        this.todos2 = data.access_token;
         this.iniciar() 
        // if(this.todos2!=null){
        //     console.log("Revisando token2", this.todos2);
        //     return (this.todos2)
        // }else{
        //     this.todos2="indefenido"
        //     return (this.todos2)
        // }
  }


  iniciar() {

    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      console.log("aaa")

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe completar el CAPTCHA",
      });
    } else {


      const usuario = {
        usuario: this.correo,
        password: this.password
      };//this.userService.Login(usuario).subscribe(todos =>{ this.todos = todos;
      this.userService.Login(usuario).subscribe({
        next: (todos) => {
          this.todos = todos;
          console.log("entroo", this.todos)
          if (this.todos.resultado && this.todos.resultado.length > 0) {
            console.log(this.todos.resultado);


            let todo = this.todos.resultado;

            console.log(todo[0].nombre);
            console.log(todo[0].usuario)

            console.log(this.correo)




            this.verificar = true;
            console.log("*//////////////", todo[0].rol)
            let encontrado = { name: todo[0].nombre, correo: this.correo, id: todo[0].id, rol: todo[0].rol, token: this.todos2 };
            console.log("Imprimos el encontrado", encontrado);
            let miStorage = window.localStorage;
            miStorage.setItem("usuario", JSON.stringify(encontrado));
            this.loading = true;
            if (todo[0].rol == 1 || todo[0].rol > 3) {
              Swal.fire({
                //Popup window position, can be 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
                position: "top",
                icon: "success",
                title: "Inicio de sesion exitoso, bienvenido " + todo[0].nombre,
                showConfirmButton: false,
              });

              const v_redirigir = localStorage.getItem("Redirigir");
              if (v_redirigir === "redireccion") {
                this.router.navigate(['/administrador/gestioncita/create_cita']);
                localStorage.removeItem("Redirigir");
                return
              }


              this.router.navigate(['/administrador/principal']);

            } else if (todo[0].rol == 2) {

              Swal.fire({
                //Popup window position, can be 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
                position: "top",
                icon: "success",
                title: "Inicio de sesion exitoso, bienvenido " + todo[0].nombre,
                showConfirmButton: false,
              });

              const v_redirigir = localStorage.getItem("Redirigir");
              if (v_redirigir === "redireccion") {
                this.router.navigate(['/pacientes/citas']);
                localStorage.removeItem("Redirigir");
                return
              }

              this.router.navigate(['/pacientes/principal']);

            } else {
              this.router.navigate(['/doctor/principal']);
              Swal.fire({
                //Popup window position, can be 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
                position: "top",
                icon: "success",
                title: "Inicio de sesion exitoso, bienvenido " + todo[0].nombre,
                showConfirmButton: false,
              });
            }



          } else {
            alert("La combinacion entre usuario y contraseña es incorrecta ehhh")
          }




        }, error: (error) => {
          if (error.status === 404 || error.status === 400) {
            Swal.fire({
              title: "Error!",
              text: "La combinación entre usuario y contraseña es incorrecta",
              icon: "error",
              confirmButtonText: "Cool",
            });
          }
          else {
            console.log("Error del servidor: " + error.status);
          }
        }
      });

    }
  }


  loginGoogle() {
    console.log("Login con Google")
    this.authGoogleService.loginWithGoogle();
  }

  loginMicrosoft() {
    console.log("Login con Microsft")
    this.authMicrosoftService.loginWithMicrosoft();
  }


}



//-------------------------------------------------------Google----------------------------------


// }
