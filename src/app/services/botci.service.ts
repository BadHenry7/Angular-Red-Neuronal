import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {botci} from "../interfaces/botci"





@Injectable({
     providedIn: 'root'
 })

export class BotciService{
    private apiUrl = 'http://localhost:8000/'
    
    constructor(private http:HttpClient) { }



 get_symptoms(): Observable<any>{
        return this.http.get<any>(this.apiUrl +'sintomas');
    } 
    
 predict_disease(user: botci): Observable<botci[]>{
        return this.http.post<botci[]>(this.apiUrl +'predict', user);
    } 
    



  //  createUser (user: User): <>


}