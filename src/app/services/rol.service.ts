import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rol } from '../interfaces/rol';





@Injectable({
    providedIn: 'root'
})

export class RolesService {

    private apiUrl = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }

    // Crear nuevo rol
    createRol(rol: Rol): Observable<any> {
        return this.http.post(this.apiUrl+'create_rol', rol);
    }


    getRol(rol_id: number): Observable<Rol> {
        return this.http.get<Rol>(`${this.apiUrl}get_rol/${rol_id}`);
    }

    // Obtener roles where id!=1"
    roles_get(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.apiUrl+'roles_get');
    }

    // Obtener todos los roles
    get_roles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.apiUrl+'get_roles/');
    }

    // Actualizar rol
    updateRol(rol_id: number, rol: Rol): Observable<any> {
        return this.http.put(`${this.apiUrl}updaterol/${rol_id}`, rol);
    }

    // Eliminar rol
    deleteRol(rol_id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}eliminarrol/${rol_id}`);
    }

}