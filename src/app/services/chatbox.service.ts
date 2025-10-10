
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

    Chatbox(user: Chatbox): Observable<Chatbox[]> {//http://localhost:5005
        return this.http.post<Chatbox[]>('https://c5b10104b573.ngrok-free.app/webhooks/rest/webhook', user);
    }



}