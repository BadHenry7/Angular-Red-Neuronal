import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ModuloxPerfil, BuscarId, BuscarIdRol } from '../interfaces/moduloxperfil';





@Injectable({
    providedIn: 'root'
})

export class ModuloxPerfilService {

    private apiUrl = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }

   
  createModuloXPerfil(moduloxperfil: ModuloxPerfil): Observable<any> {
    return this.http.post(this.apiUrl+'create_moduloxperfil', moduloxperfil);
  }


  getModulosXPerfil(): Observable<ModuloxPerfil[]> {
    return this.http.get<ModuloxPerfil[]>(this.apiUrl+'get_modulosxperfil');
  }


    getModulosPerfil(moduloxperfil: BuscarId): Observable<BuscarId[]> {
    return this.http.post<BuscarId[]>(this.apiUrl+'get_moduloxperfil', moduloxperfil);
  }

  


  get_mxp_id(moduloxperfil: BuscarIdRol): Observable<ModuloxPerfil[]> {
    return this.http.post<ModuloxPerfil[]>(this.apiUrl+'get_mxp_id', moduloxperfil);
  }


  updateModuloXPerfil(moduloxperfil: ModuloxPerfil): Observable<any> {
    return this.http.put(this.apiUrl+'update_moduloxperfil', moduloxperfil);
  }


  desactivarModuloXPerfil(moduloxperfil: BuscarId): Observable<any> {
    return this.http.put(this.apiUrl+'desactivar_moduloxperfil', moduloxperfil);
  }

   

}