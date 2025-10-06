import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      // aquí podrías validar el token con tu backend también
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
