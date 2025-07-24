import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Citas, Buscar_telegram,Reportes,ReportesUsuario,Ubicacion, Eliminar} from "../interfaces/citas"


@Injectable ({
    providedIn: 'root'
})

export class CitasService {

  private apiUrl = 'http://localhost:8000';
  private url = "https://api-nodejs-buxf.onrender.com/api/salas/getsalaByNombre/";
 
  constructor(private http:HttpClient) { }

    get_cita_admin(): Observable<Citas[]>{
        return this.http.get<Citas[]>(this.apiUrl + '/get_cita_admin/');
        
    }

    create_cita_admin(user: Citas): Observable<Citas[]>{
        return this.http.post<Citas[]>(this.apiUrl + '/create_cita/', user);
        
    }

    post_citas_doctor(user: ReportesUsuario): Observable<ReportesUsuario[]>{
        return this.http.post<ReportesUsuario[]>(this.apiUrl + '/post_citas_doctor/', user);
    }

    editar_cita(user: Eliminar){
        return this.http.post<Eliminar[]>(this.apiUrl + '/editar_cita/', user);

    }


    getReportes_citas(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_citas/', user);
    }   

    eliminar_cita(user: Eliminar): Observable<Eliminar[]>{
        return this.http.put<Eliminar[]>(this.apiUrl + '/eliminar_cita/', user);
    }
    
  
    getReportes_historial(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_historial/', user);
    }   

    
    getReportes_citas_medicos(user: Reportes): Observable<Reportes[]>{
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_citas_medicos', user);
    }   

    historia_clinica_user(user: ReportesUsuario): Observable<Reportes[]>{
        return this.http.post<Reportes[]>(this.apiUrl + '/historia_clinica_user', user);
    }   

    post_citas_users(user: ReportesUsuario): Observable<ReportesUsuario[]>{
        return this.http.post<ReportesUsuario[]>(this.apiUrl + '/post_citas_users/', user);
    }   

    
    notificaciones_telegram(user: Buscar_telegram): Observable<Buscar_telegram[]>{
        return this.http.put<Buscar_telegram[]>(this.apiUrl + '/telegram_id_user', user);
    }   

    getubicacion(): Observable<Ubicacion[]>{
        return this.http.get<Ubicacion[]>('https://api-nodejs-buxf.onrender.com/api/hospitales/gethospitales');
    } 

    getsala(user: Ubicacion): Observable<Ubicacion[]>{
        return this.http.post<Ubicacion[]>(`${this.url}${user.v_id_hospital}`, user);
    }

    


}