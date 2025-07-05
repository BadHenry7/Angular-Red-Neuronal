import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Cita{

  id?: number,
  fecha: string,
  hora: string,
  id_usuario?: number,
  estado: true,
  id_paciente?: number,
  ubicacion: string

}


@Injectable ({
    providedIn: 'root'
})

export class CitasService {

  private apiUrl = 'https://red-neuronal-api.onrender.com/';
 
  constructor(private http:HttpClient) { }

  getCita(): Observable<Cita[]>{
      return this.http.get<Cita[]>('https://red-neuronal-api.onrender.com/get_cita')
    }

}