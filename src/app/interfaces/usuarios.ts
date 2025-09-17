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
    edad?:number,
    estatura?:string,
    nombre_rol?: string
}


export interface Buscar {
    id: number
    estado?: boolean
}


export interface Login {
  usuario: string;
  password: string;
}

export interface SMS {
  phoneNumber: string;
  message: string;
}

export interface ValidarIncapacidad {
  id: number;
  cedula: string;
}





