import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sintomas } from '../interfaces/sintomas';

@Injectable({
  providedIn: 'root'
})
export class SintomasService {
  private apiUrl = 'https://red-neuronal-api.onrender.com/';

  constructor(private http: HttpClient) {}

  // Crear síntoma
  createSintoma(sintoma: Sintomas): Observable<any> {
    return this.http.post(this.apiUrl+'create_sintomas', sintoma);
  }

  // Obtener síntoma por una ID en especifica
  getSintoma(sintomas_id: number): Observable<Sintomas> {
    return this.http.get<Sintomas>(`${this.apiUrl}get_sintoma/${sintomas_id}`);
  }

  // Obtener todos los síntomas
  getSintomas(): Observable<Sintomas[]> {
    return this.http.get<Sintomas[]>(this.apiUrl+'get_sintomas/');
  }

  // Actualizar síntoma
  updateSintoma(sintomas_id: number, sintoma: Sintomas): Observable<any> {
    return this.http.put(`${this.apiUrl}update_sintomas/${sintomas_id}`, sintoma);
  }

  // Eliminar síntoma
  deleteSintoma(sintomas_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete_sintomas/${sintomas_id}`);
  }
}