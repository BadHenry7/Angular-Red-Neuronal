export interface Modulo {
  id?: number;
  nombre: string;
  submodulos: string;
  url: string;
  descripcion: string;
  estado: boolean;
}

export interface BuscarId {
  id?: number;
}


export interface Modelito {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  modulo_seleccionado: number[];
}