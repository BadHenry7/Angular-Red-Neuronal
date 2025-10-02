
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Chatbox } from "../interfaces/chatbox"





@Injectable({
    providedIn: 'root'
})

export class ChatboxService {

    private apiUrl = 'http://localhost:8000/'

    constructor(private http: HttpClient) { }

    Chatbox(user: Chatbox): Observable<Chatbox[]> {//Todos los usuarios
        return this.http.post<Chatbox[]>('http://localhost:5005/webhooks/rest/webhook', user);
    }



}