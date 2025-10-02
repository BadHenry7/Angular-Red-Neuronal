import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Diagnosticos, Reportes } from "../interfaces/diagnostico"


@Injectable({
    providedIn: 'root'
})

export class DiagnosticoService {

    private apiUrl = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }


    getReportes_diagnosticos(user: Reportes): Observable<Reportes[]> {
        return this.http.post<Reportes[]>(this.apiUrl + 'reportes_diagnosticos/', user);
    }


    createDiagnostico(diagnostico: Diagnosticos): Observable<any> {
        return this.http.post(this.apiUrl+'create_diagnosticos', diagnostico);
    }


    getDiagnostico(diagnosticos_id: number): Observable<Diagnosticos> {
        return this.http.get<Diagnosticos>(`${this.apiUrl}get_diagnostico/${diagnosticos_id}`);
    }


    getDiagnosticos(): Observable<Diagnosticos[]> {
        return this.http.get<Diagnosticos[]>(this.apiUrl+'get_diagnosticos/');
    }

    updateDiagnostico(diagnosticos_id: number, diagnosticos: Diagnosticos): Observable<any> {
        return this.http.put(`${this.apiUrl}update_diagnosticos/${diagnosticos_id}`, diagnosticos);
    }


    deleteDiagnostico(diagnosticos_id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}delete_diagnosticos/${diagnosticos_id}`);
    }




}