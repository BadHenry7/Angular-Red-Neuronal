import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {VerifUser} from '../interfaces/sesionGoogleMicrosoft'




@Injectable ({
    providedIn: 'root'
})

export class SesionGoogleService {

  private apiUrl = 'http://localhost:8000/';
 
  constructor(private http:HttpClient) { }


  verificarUsuario(user: VerifUser): Observable<any> {
  return this.http.post(this.apiUrl+'verif_user', user);
}

}