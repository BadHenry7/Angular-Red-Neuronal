import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Citas, Buscar_telegram, Sala ,Reportes, ReportesUsuario, Ubicacion, Eliminar, Buscar_historial_clinico, create_diagnostico, create_sintomas, validarHora } from "../interfaces/citas"


@Injectable({
    providedIn: 'root'
})

export class CitasService {

    private apiUrl = 'https://red-neuronal-api.onrender.com';
    private url = "https://api-nodejs-buxf.onrender.com/api/salas/getsalaByNombre/";

    constructor(private http: HttpClient) { }

    get_cita_admin(): Observable<Citas[]> {
        return this.http.get<Citas[]>(this.apiUrl + '/get_cita_admin/');

    }

    create_cita_admin(user: Citas): Observable<Citas[]> {
        return this.http.post<Citas[]>(this.apiUrl + '/create_cita/', user);

    }

    post_citas_doctor(user: ReportesUsuario): Observable<ReportesUsuario[]> {
        return this.http.post<ReportesUsuario[]>(this.apiUrl + '/post_citas_doctor/', user);
    }

    editar_cita(user: Eliminar) {
        return this.http.post<Eliminar[]>(this.apiUrl + '/editar_cita/', user);
    }


    getReportes_citas(user: Reportes): Observable<Reportes[]> {
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_citas/', user);
    }

    eliminar_cita(user: Eliminar): Observable<Eliminar[]> {
        return this.http.put<Eliminar[]>(this.apiUrl + '/eliminar_cita/', user);
    }


    getReportes_historial(user: Reportes): Observable<Reportes[]> {
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_historial/', user);
    }


    getReportes_citas_medicos(user: Reportes): Observable<Reportes[]> {
        return this.http.post<Reportes[]>(this.apiUrl + '/reportes_citas_medicos', user);
    }

    historia_clinica_user(user: ReportesUsuario): Observable<Reportes[]> {
        return this.http.post<Reportes[]>(this.apiUrl + '/historia_clinica_user', user);
    }

    post_citas_users(user: ReportesUsuario): Observable<ReportesUsuario[]> {
        return this.http.post<ReportesUsuario[]>(this.apiUrl + '/post_citas_users/', user);
    }


    notificaciones_telegram(user: Buscar_telegram): Observable<Buscar_telegram[]> {
        return this.http.put<Buscar_telegram[]>(this.apiUrl + '/telegram_id_user', user);
    }

    getubicacion(): Observable<Ubicacion[]> {
        return this.http.get<Ubicacion[]>('https://api-nodejs-buxf.onrender.com/api/hospitales/gethospitales');
    }

    getsala(user: string): Observable<Sala[]> {
        const users= user
        return this.http.post<Sala[]>(`${this.url}${users}`, user);
    }

    add_diagnostico(user: create_diagnostico): Observable<create_diagnostico[]> {
        return this.http.post<create_diagnostico[]>(this.apiUrl + '/create_diagnosticos', user);
    }

    add_sintomas(user: create_sintomas): Observable<create_sintomas[]> {
        return this.http.post<create_sintomas[]>(this.apiUrl + '/create_sintomas', user);
    }


    get_buscar_usuario(user: Buscar_historial_clinico): Observable<Buscar_historial_clinico[]> {
        return this.http.post<Buscar_historial_clinico[]>(this.apiUrl + '/get_user_document', user);
    }

    get_historia_clinica(user: Buscar_historial_clinico): Observable<Buscar_historial_clinico[]> {
        return this.http.post<Buscar_historial_clinico[]>(this.apiUrl + '/historia_clinica', user);
    }

    update_Cita(user: Citas): Observable<Citas[]>{
        return this.http.put<Citas[]>(this.apiUrl + '/update_cita' ,user);
    }

    desactivar_cita(user: Eliminar): Observable<Eliminar[]> {
        return this.http.put<Eliminar[]>(this.apiUrl + '/eliminar_cita' ,user);
    }

    validarHora(): Observable<validarHora[]> {
        return this.http.get<validarHora[]>(this.apiUrl + '/ValidarHora');
    }




}