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
    estado?: boolean
}


export interface Login {
  usuario: string;
  password: string;
}



