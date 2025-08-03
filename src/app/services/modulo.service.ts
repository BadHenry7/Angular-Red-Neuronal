import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Modulo, BuscarId, Modelito } from "../interfaces/modulo"





@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private apiUrl = 'https://red-neuronal-api.onrender.com/'

    constructor(private http: HttpClient) { }


    createModulo(modulo: Modulo): Observable<any> {
        return this.http.post(this.apiUrl+'create_modulo', modulo);
    }

    getModulos(): Observable<Modulo[]> {
        return this.http.get<Modulo[]>(this.apiUrl+'get_modulos');
    }


    getModulo(modulo: BuscarId): Observable<BuscarId[]> {
        return this.http.post<BuscarId[]>(this.apiUrl+'get_modulo', modulo);
    }

    getModulosAsignados(modulo: BuscarId): Observable<Modulo[]> {
        return this.http.post<Modulo[]>(this.apiUrl+'get_modulos_asignado', modulo);
    }


    updateModulo(modulo: Modulo): Observable<any> {
        return this.http.put(this.apiUrl+'update_modulo', modulo);
    }

    updateModuloSeleccionado(modulo: Modelito): Observable<any> {
        return this.http.put(this.apiUrl+'update_modulo_seleccionado', modulo);
    }

    desactivarModulo(modulo: BuscarId): Observable<any> {
        return this.http.put(this.apiUrl+'desactivar_modulo', modulo);
    }




}