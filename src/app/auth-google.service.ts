import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from './environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService) {
 
  }


  loginWithGoogle() {
    console.log("El entra weon  ")
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

    }


    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();//cuando este el token apunto de caducar, lo refrezca automaticamente
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
        this.oauthService.initLoginFlow();

  }

  // login() {
  //       this.oauthService.initLoginFlow();


  // }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();//retorna los datos al perfil
  }



}
