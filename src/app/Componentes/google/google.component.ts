import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../auth-google.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-google',
  imports: [],
  templateUrl: './google.component.html',
  styleUrl: './google.component.css'
})
export class GoogleComponent implements OnInit {


  constructor(private router: Router, private authGoogleService: AuthGoogleService,
    private oauthService: OAuthService
  ) { }//supuestamente sirve para usar el router.navigate que evita recargar la pagina con window.location.href

  ngOnInit(): void {
    console.log("ws")
    const config: AuthConfig = {
      requireHttps: false,
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientId,
      redirectUri: window.location.origin + '/GoogleLogin',
      scope: 'openid profile email',
      customQueryParams: {
        prompt: 'select_account'
      }
    };

    this.oauthService.configure(config);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      const datos_user: any = this.oauthService.getIdentityClaims();
      if (datos_user) {
        const user = {
          google_id: datos_user.sub,
          foto: datos_user.picture,
          access_token: this.oauthService.getAccessToken(),
          estado: 1,
          usuario: datos_user.email,
          nombre: datos_user.given_name,
          apellido: datos_user.family_name ? datos_user.family_name : '',
        };


        fetch("https://red-neuronal-api.onrender.com/verif_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            console.log("Respuesta del backend:", data);

            const v_id = data.id ? data.id : 1;
            const rol_v = data.rol_v ? data.rol_v : 1;
            const v_estado = data.estado ? data.estado : false;
            const estado_v = data.Informacion;



            let encontrado = {
              name: datos_user.given_name, correo: datos_user.email,
              id: v_id, apellido: datos_user.family_name
            }

            let miStorage = window.localStorage;
            miStorage.setItem("usuario", JSON.stringify(encontrado))



            if (estado_v === "Ya_existe" && v_estado != false) {
              if (rol_v == 1) {
                this.router.navigate(['/administrador/principal']);
              }
              else if (rol_v == 2) {
                this.router.navigate(['/pacientes/principal']);

              }
              else if (rol_v == 3) {
                this.router.navigate(['/doctor/principal']);
              }
              else {
                this.router.navigate(['/vista_main']);
              }
            } else if (estado_v === "Registrada") {
              console.log("Estado actual:", estado_v, "Rol:", rol_v);
              this.router.navigate(['/completar_informacion']);
            } else if (estado_v === "Ya_existe" && v_estado == false) {

              this.router.navigate(['/completar_informacion']);

            }
          }
          );

      } else {
        console.log("ws2")

      }
    })
  }

}
