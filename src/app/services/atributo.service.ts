import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Atributo } from "../interfaces/atributo"





@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private apiUrl = 'https://red-neuronal-api.onrender.com/'

    constructor(private http: HttpClient) { }


    createAtributo(atributo: Atributo): Observable<any> {
        return this.http.post<any>(this.apiUrl+'create_atributo', atributo);
    }

    getAtributo(id: number): Observable<Atributo> {
        return this.http.get<Atributo>(`${this.apiUrl}get_atributo/${id}`);
    }

    getAtributos(): Observable<Atributo[]> {
        return this.http.get<Atributo[]>(this.apiUrl+'get_atributos/');
    }

    updateAtributo(atributo_id: number, atributo: Atributo): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}actualizaratributo/${atributo_id}`, atributo);
    }

    deleteAtributo(atributo_id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}eliminaratributo/${atributo_id}`);
    }




    //  createUser (user: User): <>


}