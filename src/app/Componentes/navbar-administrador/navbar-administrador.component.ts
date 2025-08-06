import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-administrador',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar-administrador.component.html',
  styleUrl: './navbar-administrador.component.css'
})
export class NavbarAdministradorComponent implements OnInit {

constructor (private router:Router){}

 henry : boolean= true
  image : String=''
name:string='Usuario'

ngOnInit(): void {
  
     const usuarioGuardado = localStorage.getItem('usuario')

     if (usuarioGuardado){
      const usuario= JSON.parse(usuarioGuardado)
      this.name= usuario.name;
     }
    
    

}

   confirmacion() {
        Swal.fire({
      title: "¿Estas seguro?",
      text: "Se perdera lo que no hayas guardado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
          this.router.navigate(['/']);

       // window.location.href = "/";
      }
    });
    
}
 
}
