import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
    


}