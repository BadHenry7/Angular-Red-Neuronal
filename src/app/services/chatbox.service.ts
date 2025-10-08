
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Chatbox } from "../interfaces/chatbox"





@Injectable({
    providedIn: 'root'
})

export class ChatboxService {

    private apiUrl = 'https://red-neuronal-api.onrender.com/'

    constructor(private http: HttpClient) { }

    Chatbox(user: Chatbox): Observable<Chatbox[]> {//Todos los usuarios
        return this.http.post<Chatbox[]>('https://4229cc3b5ee3.ngrok-free.app/webhooks/rest/webhook', user);
    }



}