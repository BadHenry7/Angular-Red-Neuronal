import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-administrador',
  imports: [RouterLink],
  templateUrl: './navbar-administrador.component.html',
  styleUrl: './navbar-administrador.component.css'
})
export class NavbarAdministradorComponent {
 henry : boolean= true
  image : String=''
constructor (private router:Router){}

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
