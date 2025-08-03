import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthMicrosoftService {

   constructor(private oauthService: OAuthService) {
   
    
    }
  
  
    loginWithMicrosoft() {
    console.log("El entra weon")

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
      this.oauthService.setupAutomaticSilentRefresh();//cuando este el token apunto de caducar, lo refrezca automaticamente
      this.oauthService.loadDiscoveryDocumentAndTryLogin()
        this.oauthService.initLoginFlow();
    
  
    }
  
    // login() {
    //   this.oauthService.initLoginFlow();
    //   //this.initLogin()
    // }
  
    logout() {
      this.oauthService.logOut();
    }
  
    getProfile() {
      return this.oauthService.getIdentityClaims();//retorna los datos al perfil
    }
  
  
}
