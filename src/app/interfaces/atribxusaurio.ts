

export interface Especialidad {
    id?:number
    id_usuario?: number;
    id_atributo?: number;
    valor: string;
    descripcion: string;
    estado?:boolean
}

export interface Especialidades {
    id?:number
    nombre: string;
}


export interface BuscarxU {
    id_usuario: number
}

export interface UpdateAtributoxusuario {
  id_usuario: number;
  valor: string;
  descripcion: string;
}
