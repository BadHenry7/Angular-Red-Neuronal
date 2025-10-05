import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Login, Buscar, SMS, ValidarIncapacidad, PasswordOlvidado } from "../interfaces/usuarios"





@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private apiUrl = 'https://red-neuronal-api.onrender.com/'

    constructor(private http: HttpClient) { }

    Login(user: Login): Observable<User[]> {
        return this.http.post<User[]>(this.apiUrl + 'login', user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'get_users');
    }

    getUser(user: Buscar): Observable<User[]> {//Solo uno
        return this.http.post<User[]>(this.apiUrl + 'get_user', user);
    }

    getMedico(): Observable<User[]> { //Medicos
        return this.http.get<User[]>(this.apiUrl + 'getmedico');
    }


    addUser(user: User): Observable<User[]> {
        return this.http.post<User[]>(this.apiUrl + 'create_user', user);
    }


    UpdateUser(user: User): Observable<User[]> {
        return this.http.put<User[]>(this.apiUrl + 'actualizaruser', user);
    }

    UpdateAdm(user: User): Observable<User[]> {
        return this.http.put<User[]>(this.apiUrl + 'update_adm', user);
    }


    EstadoUser(user: Buscar): Observable<User[]> {
        return this.http.put<User[]>(this.apiUrl + 'estado_user', user);
    }

    getpaciente(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'getpaciente');
    }

    getdoctor(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + 'getmedico');
    }


    sendSMS(user: SMS): Observable<SMS[]> {
        return this.http.post<SMS[]>('https://api-nodejs-buxf.onrender.com/api/send-sms', user);
    }

    validarIncapacidad(user: ValidarIncapacidad): Observable<ValidarIncapacidad[]> {
        return this.http.post<ValidarIncapacidad[]>(this.apiUrl + 'ValidarIncapacidad', user);
    }



    olvidePassword(user: PasswordOlvidado): Observable<PasswordOlvidado[]> {
        return this.http.post<PasswordOlvidado[]>(this.apiUrl + 'olvidePassword', user);
    }

    updatePassword(user: PasswordOlvidado): Observable<PasswordOlvidado[]> {
        return this.http.put<PasswordOlvidado[]>(this.apiUrl + 'update_password', user);
    }







    //  createUser (user: User): <>


}