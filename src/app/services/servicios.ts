import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/usuarios";

@Injectable ({
    providedIn: 'root'
})


export class Prueba {

    ServerUrl='/BD.json';

    private ApiUrl: String = this.ServerUrl; 

    constructor (private http:HttpClient){}

    getPrueba(){
        return this.http.get(`${this.ApiUrl}`)
    }

    // getPrueba(): Observable<Usuario[]>{
    //     return this.http.get<Usuario[]>(`${this.ApiUrl}`)
    // }
    


}