import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User, Login, Buscar} from "../interfaces/usuarios"





@Injectable({
     providedIn: 'root'
 })

export class UsersService{
    private apiUrl = 'http://localhost:8000/'
    
    constructor(private http:HttpClient) { }

    Login(user: Login): Observable<User[]>{
        return this.http.post<User[]>('http://localhost:8000/login', user);
    }  

    getUsers(): Observable<User[]>{//Todos los usuarios
        return this.http.get<User[]>('http://localhost:8000/get_users');
    }   

    getUser(user: Buscar): Observable<User[]>{//Solo uno
        return this.http.post<User[]>('http://localhost:8000/get_user', user);
    }   

    getMedico(): Observable<User[]>{ //Medicos
        return this.http.get<User[]>('http://localhost:8000/getmedico');
    }   
    
    
    addUser(user: User): Observable<User[]>{
        return this.http.post<User[]>('http://localhost:8000/create_user', user);
    }
    

    UpdateUser(user: User): Observable<User[]>{
        return this.http.put<User[]>('http://localhost:8000/actualizaruser', user);
    }  


    EstadoUser(user: Buscar): Observable<User[]>{
        return this.http.put<User[]>('http://localhost:8000/estado_user', user);
    }  

    getpaciente(): Observable<User[]>{//Todos los usuarios
        return this.http.get<User[]>(this.apiUrl + 'getpaciente');
    }

    getdoctor(): Observable<User[]>{//Todos los usuarios
        return this.http.get<User[]>(this.apiUrl + 'getmedico');
    }




  //  createUser (user: User): <>


}