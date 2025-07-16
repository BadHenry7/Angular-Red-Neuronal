import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Reportes{
    id?: number,
    fecha:string,
    fecha2:string,
    
}

export interface Citas{
    
    fecha:string,
    hora:string,
    medico:string,
    paciente:string,
    id?:number,
    ubicacion:string,
    salas:string,  

}

export interface ReportesUsuario{
    id_paciente: number
}



@Injectable ({
    providedIn: 'root'
})

export class CitasService {

  private apiUrl = 'http://localhost:8000';
 
  constructor(private http:HttpClient) { }

    get_cita_admin(): Observable<Citas[]>{
        return this.http.get<Citas[]>(this.apiUrl + '/get_cita_admin/');
        
    }

    create_cita_admin(user: Citas): Observable<Citas[]>{
        return this.http.post<Citas[]>('http://localhost:8000/create_cita/', user);
        
    }


    getReportes_citas(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/reportes_citas/', user);
    }   

  
    getReportes_historial(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/reportes_historial/', user);
    }   

    
    getReportes_citas_medicos(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/reportes_citas_medicos', user);
    }   

    historia_clinica_user(user: ReportesUsuario): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/historia_clinica_user', user);
    }   

    post_citas_users(user: ReportesUsuario): Observable<Reportes[]>{
        return this.http.post<Reportes[]>('http://localhost:8000/post_citas_users/', user);
    }   


}