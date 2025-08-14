import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {incapacidad , incapacidad_add} from "../interfaces/dynamodb"


@Injectable({
    providedIn: 'root'
})

export class DynamoDBService {

    private apiUrl = 'https://red-neuronal-api.onrender.com/';

    constructor(private http: HttpClient) { }


    getincapacidadMedica(user: incapacidad): Observable<incapacidad[]> {
        return this.http.post<incapacidad[]>(this.apiUrl + 'incapacidad_medica', user);
    }

     añadirIncapacidad(user: incapacidad_add): Observable<incapacidad_add[]> {
        return this.http.post<incapacidad_add[]>(this.apiUrl + 'incapacidad', user);
    }






}