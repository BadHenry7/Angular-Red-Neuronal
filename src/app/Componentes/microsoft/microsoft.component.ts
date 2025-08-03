import { Component } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-microsoft',
  imports: [],
  templateUrl: './microsoft.component.html',
  styleUrl: './microsoft.component.css'
})
export class MicrosoftComponent {


  constructor(private router: Router, private authGoogleService: AuthGoogleService,
    private oauthService: OAuthService
  ) { }//supuestamente sirve para usar el router.navigate que evita recargar la pagina con window.location.href


  async obtener(access_token: string) {
    const datos = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const perfil = await datos.json()
    console.log(perfil);
    return perfil


  }

  ngOnInit() {
    console.log("ws")
    console.log(environment.microsoftClientID)
    const config: AuthConfig = {
      requireHttps: false,

      issuer: 'https://login.microsoftonline.com/1e9aabe8-67f8-4f1c-a329-a754e92499ae/v2.0',

      strictDiscoveryDocumentValidation: false,
      clientId: environment.microsoftClientID,
      redirectUri: window.location.origin + '/MicrosoftLogin',
      scope: 'openid profile email User.Read',
      responseType: 'code',
      customQueryParams: {
        prompt: 'select_account'
      }

    }
    this.oauthService.configure(config);

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(async () => {
      const datos_user: any = this.oauthService.getIdentityClaims();
      console.log(datos_user)
      if (datos_user) {


        const access_token = this.oauthService.getAccessToken();
        const user = await this.obtener(access_token);
        console.log("sssssssssssss", user)

        
        const usuarioBD = {
          google_id: user.id,
          foto: '',
          access_token: this.oauthService.getAccessToken(),
          estado: 1,
          usuario: user.mail || user.userPrincipalName,
          nombre: user.givenName,
          apellido: user.surname

        };


        fetch("https://red-neuronal-api.onrender.com/verif_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioBD),
        })
          .then(res => res.json())
          .then(data => {
            console.log("Respuesta del backend:", data);

            const v_id = data.id ? data.id : 1;
            const rol_v = data.rol_v ? data.rol_v : 1;
            const v_estado = data.estado ? data.estado : false;
            const estado_v = data.Informacion;
            console.log(v_estado)


            let encontrado = {
              name: user.givenName, correo: user.userPrincipalName,
              id: user.id, apellido: user.surname
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
