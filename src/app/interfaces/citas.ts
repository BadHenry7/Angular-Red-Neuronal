
export interface Reportes {
  id?: number,
  fecha: string,
  fecha2: string,

}

export interface Ubicacion {

  nombre_hospital: string,

}

export interface Citas {

  fecha: string,
  hora: string,
  id_paciente?: number,
  id_usuario?: number;
  id?: number,
  ubicacion: string,
  salas?: string,
  estado?: boolean

}

export interface Eliminar {
  id: number
}

export interface ReportesUsuario {
  id_paciente: number
}


export interface Buscar_telegram {
  id: number
  id_telegram: String
}
