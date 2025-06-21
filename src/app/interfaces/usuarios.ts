export interface Usuario{
    id: number
    nombre: string
    apellido:string
    documento: string
    telefono: string
    genero: string
    edad: string
    usuario: string
    password: string
}

export interface Cita {
  id: number;
  paciente: string;
  medico: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  salas: string;
}


