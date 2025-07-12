import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
//import {User} from "../interfaces/usuarios"

export interface User{
    usuario:string,
    password?:string,
    id?:number,
    nombre:string,
    apellido:string,
    documento:string,
    telefono:string,
    id_rol?:number,
    estado?:boolean,
    genero?:string,
    edad?:number
}


export interface Buscar {
id: number
}


export interface Login {
  usuario: string;
  password: string;
}








@Injectable({
     providedIn: 'root'
 })

export class UsersService{
    private apiUrl = 'http://localhost:8000/'
    
    constructor(private http:HttpClient) { }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>('http://localhost:8000/get_users');
    }   

    getUser(user: Buscar): Observable<User[]>{
        return this.http.post<User[]>('http://localhost:8000/get_user', user);
    }   

    Login(user: Login): Observable<User[]>{
        return this.http.post<User[]>('http://localhost:8000/login', user);
    }   
    
    addUser(user: User): Observable<User[]>{
        return this.http.post<User[]>('http://localhost:8000/create_user', user);
    }
    
    
    UpdateUser(user: User): Observable<User[]>{
        return this.http.put<User[]>('http://localhost:8000/actualizaruser', user);
    }  

  //  createUser (user: User): <>


}