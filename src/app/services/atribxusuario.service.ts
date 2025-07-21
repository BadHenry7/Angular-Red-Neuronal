import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Especialidades, Especialidad, BuscarxU} from "../interfaces/atribxusaurio"





@Injectable({
     providedIn: 'root'
 })

export class AtribxUsuario{
    private apiUrl = 'http://localhost:8000/'
    
    constructor(private http:HttpClient) { }

    getEspecialidades(): Observable<Especialidades[]> {
        return this.http.get<Especialidades[]>('https://api-nodejs-buxf.onrender.com/api/especialidades/getespecialidades');
    }

    getAtributosXusuarios():Observable<Especialidad[]> {
        return this.http.get<Especialidad[]>(this.apiUrl +'get_atributoxusuarios');
    }

     getAtributosXusuario(id_usuario: BuscarxU):Observable<Especialidad[]> {
        return this.http.post<Especialidad[]>(this.apiUrl +'get_atributoxusuario', id_usuario);
    }
    
    
    addAtrXUse(user:Especialidad): Observable<Especialidad[]>{
        return this.http.post<Especialidad[]>(this.apiUrl +'create_atributoxusuario', user);
    }


  //  createUser (user: User): <>


}