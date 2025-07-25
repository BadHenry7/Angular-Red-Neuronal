export interface ModuloxPerfil {
  id?: number;
  id_rol?: number;
  id_modulo: number[]; // Lista de IDs (equivale a List[int])
  estado: boolean;
}

export interface BuscarId {
  id_modulo?: number;
}

export interface BuscarIdRol {
  id_rol: number;
}