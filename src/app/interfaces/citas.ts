
export interface Reportes {
  id?: number,
  fecha: string,
  fecha2: string,

}

export interface Ubicacion {

  nombre_hospital?: string,
  v_id_hospital?: Number

}

export interface Sala {
  nombre_sala: string;
  id_sala?: string;
}

export interface Citas {

  fecha: string,
  hora: string,
  id_paciente?: number,
  id_usuario?: number;
  id?: number,
  ubicacion: string,
  salas?: string,
  estado?: boolean,

}

export interface Eliminar {
  id: number
}

//https://api-nodejs-buxf.onrender.com/api/salas/getsalaByNombre/${v_id_hospital}`

export interface ReportesUsuario {
  id_paciente: number
}


export interface Buscar_telegram {
  id: number
  id_telegram: String
}

export interface Buscar_historial_clinico {
  documento?: string
  id_paciente?: number
}


export interface create_diagnostico {
  id_cita: number,
  resultado: string,
  descripcion: string,
  Observacion: string,
  estado: boolean
}

export interface create_sintomas {
  nombre: string,
  descripcion: string,
  estado: boolean,
  id_cita: number,
}