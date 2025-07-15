import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Reportes{
    fecha:string,
    fecha2:string,
    
}



@Injectable ({
    providedIn: 'root'
})

export class DiagnosticoService {

  private apiUrl = 'https://red-neuronal-api.onrender.com/';
 
  constructor(private http:HttpClient) { }


    getReportes_diagnosticos(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/reportes_diagnosticos/', user);
    }   


}